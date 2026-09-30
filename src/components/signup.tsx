import { useState } from "react";
import { joinBriefing, leaveBriefing } from "@/lib/subscribe.functions";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(kind: "join" | "leave", value: string) {
    setPending(true);
    setMessage("");
    try {
      const result = kind === "join" ? await joinBriefing({ data: value }) : await leaveBriefing({ data: value });
      if (!result.ok) {
        setMessage(result.error);
        return;
      }
      if (result.status === "joined") setMessage("You're on the list. Ro-Mac has this address for the next briefing.");
      if (result.status === "already") setMessage("That address is already on the list.");
      if (result.status === "removed") setMessage("You're off the list.");
      if (result.status === "missing") setMessage("That address was not on the list.");
      if (result.status === "joined" || result.status === "removed") setEmail("");
    } catch {
      setMessage("The list did not save. Try again in a moment.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      className="border border-navy bg-sheet px-5 py-8 sm:px-8"
      onSubmit={(event) => {
        event.preventDefault();
        const value = String(new FormData(event.currentTarget).get("email") ?? "");
        void submit("join", value);
      }}
    >
      <p className="kicker">Get the next briefing</p>
      <h2 className="mt-2 max-w-xl font-serif text-3xl leading-tight font-semibold">
        Sign up for the morning briefing. A lot of people stay for the joke.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Leave an email. It is saved for Ro-Mac and is not shown to other readers. No password.
        The briefing is still published on this page each morning.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="brief-email">
          Email address
        </label>
        <input
          name="email"
          id="brief-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="h-11 min-w-0 flex-1 border border-line bg-paper px-3 text-sm text-ink"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center bg-navy px-4 text-sm font-semibold text-sheet disabled:opacity-60"
        >
          {pending ? "Saving…" : "Sign up"}
        </button>
      </div>
      <button
        type="button"
        disabled={pending}
        onClick={(event) => {
          const form = event.currentTarget.form;
          const value = form ? String(new FormData(form).get("email") ?? "") : email;
          void submit("leave", value);
        }}
        className="mt-3 text-sm text-muted underline decoration-line underline-offset-4"
      >
        Take me off the list
      </button>
      <p className="mt-3 min-h-5 text-sm text-ink-soft" role="status">
        {message}
      </p>
    </form>
  );
}
