import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { useSaved } from "@/lib/saved";
import { cn } from "@/lib/cn";

export function SaveButton({ slug }: { slug: string }) {
  const [ready, setReady] = useState(false);
  const saved = useSaved((s) => s.slugs.includes(slug));
  const toggle = useSaved((s) => s.toggle);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={ready ? saved : false}
      className={cn(
        "inline-flex h-11 items-center gap-2 border px-3 text-sm font-semibold",
        ready && saved ? "border-navy bg-navy text-sheet" : "border-line bg-sheet text-ink",
      )}
    >
      <Bookmark className="size-4" aria-hidden="true" />
      {ready && saved ? "Saved" : "Save"}
    </button>
  );
}
