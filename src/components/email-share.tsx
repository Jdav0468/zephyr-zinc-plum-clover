import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

function mailHref(title: string, url: string) {
  const subject = title.toLowerCase().includes("ro-mac") ? title : `${title} — The Ro-Mac Brief`;
  const body = [
    "I wanted to share this with you.",
    "",
    title,
    url,
    "",
    "The Ro-Mac Brief explains what is happening in trucking, in plain English.",
  ].join("\n");
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function EmailShare({ label, title }: { label: string; title?: string }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [href, setHref] = useState(
    "mailto:?subject=The%20Ro-Mac%20Brief&body=The%20Ro-Mac%20Brief%20explains%20trucking%20news%20in%20plain%20English.",
  );

  useEffect(() => {
    const pageTitle = title ?? document.title ?? "The Ro-Mac Brief";
    setHref(mailHref(pageTitle, window.location.href));
  }, [pathname, title]);

  return (
    <a
      href={href}
      className="inline-flex h-11 items-center gap-2 text-sm font-semibold text-navy underline decoration-line underline-offset-4"
    >
      <Mail className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}
