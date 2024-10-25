import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react"
import SocialShare from './components/SocialShare';
import "./tailwind.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href="/favicon" type="image/png" />
      </head>
      <body
        className="flex flex-col items-center justify-start text-white min-h-screen"
        style={{
          backgroundColor: '#1a1a1a', // Darker background for contrast
          backgroundImage: 'url(/3.png)',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay', // More dramatic blend mode
        }}
      >
        <div className="max-w-3xl mx-auto flex flex-col justify-center min-h-screen px-4 py-6">
          <div className="text-center py-8">
            <h1 className="text-5xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">🪰🔥 Tactical Fly Elimination Directory</h1>
            <p className="text-2xl mb-6 text-gray-300">
              Welcome to your ultimate guide for outsmarting and obliterating that pesky f* with style and a smile.
            </p>
          </div>
          {children}
          <SocialShare />
          <div className="text-center py-8">
            <p className="text-2xl mb-6 text-gray-300">
              &copy; {new Date().getFullYear()} Tactical Fly Elimination Directory. All rights reserved.
            </p>
          </div>
          <ScrollRestoration />
          <Scripts />
          <Analytics />
        </div>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
