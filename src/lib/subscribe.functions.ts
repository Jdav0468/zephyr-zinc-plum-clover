import { createServerFn } from "@tanstack/react-start";

function clip(email: string) {
  return typeof email === "string" ? email.slice(0, 160) : "";
}

export const joinBriefing = createServerFn({ method: "POST" })
  .validator(clip)
  .handler(async ({ data }) => {
    const { joinList } = await import("@/lib/subscribe.server");
    return joinList(data);
  });

export const leaveBriefing = createServerFn({ method: "POST" })
  .validator(clip)
  .handler(async ({ data }) => {
    const { leaveList } = await import("@/lib/subscribe.server");
    return leaveList(data);
  });
