import { createFileRoute } from "@tanstack/react-router";
import { ensureToday } from "@/lib/daily.server";

export const Route = createFileRoute("/api/daily")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const result = await ensureToday();
          return Response.json(result);
        } catch (error) {
          const message = error instanceof Error ? error.message : "daily bot failed";
          return Response.json({ state: "skipped", reason: message }, { status: 500 });
        }
      },
    },
  },
});
