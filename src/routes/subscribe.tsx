import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/signup";

export const Route = createFileRoute("/subscribe")({
  head: () => ({
    meta: [
      { title: "Sign up — The Ro-Mac Brief" },
      { name: "description", content: "Get the next Ro-Mac Logistics briefing." },
    ],
  }),
  component: SubscribePage,
});

function SubscribePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <SignupForm />
    </div>
  );
}
