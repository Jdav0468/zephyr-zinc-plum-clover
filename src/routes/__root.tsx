import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Shell } from "@/components/shell";
import { loadTodayJoke } from "@/lib/daily.functions";
import appCss from "../styles.css?url";

const APP_NAME = "The Ro-Mac Brief";

export const Route = createRootRoute({
  loader: () => loadTodayJoke(),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "A daily briefing from Ro-Mac Logistics on trucking news, laws, diesel prices, cargo theft, illegal CDLs, and fraudulent carriers — written for people outside the industry.",
      },
      { name: "theme-color", content: "#000000" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/romac-mark.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;600;700&display=swap",
      },
    ],
  }),
  component: Root,
});

function Root() {
  const joke = Route.useLoaderData();
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Shell joke={joke}>
            <Outlet />
          </Shell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
