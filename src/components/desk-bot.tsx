import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fileToday } from "@/lib/daily.functions";

export function DeskBot() {
  const router = useRouter();
  const [note, setNote] = useState("The desk bot checks public sources once a day.");

  useEffect(() => {
    let cancel = false;
    async function file() {
      for (let attempt = 0; attempt < 6; attempt += 1) {
        const result = await fileToday();
        if (cancel) return;
        if (result.state === "ready" && result.created) {
          setNote("Today's briefing is filed.");
          await router.invalidate();
          return;
        }
        if (result.jokeCreated) await router.invalidate();
        if (result.state === "ready") {
          setNote("Today's briefing is already on the desk.");
          return;
        }
        if (result.state === "skipped") {
          setNote("");
          return;
        }
        setNote("The desk bot is filing today's briefing.");
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    }
    void file().catch(() => {
      if (!cancel) setNote("The desk bot will try again on the next visit.");
    });
    return () => {
      cancel = true;
    };
  }, [router]);

  if (!note) return null;
  return <p className="text-sm text-muted">{note}</p>;
}
