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
        <link rel="icon" href="/ffavicon.png" type="image/png" />
      </head>
      <body
        className="flex flex-col items-center justify-start text-white min-h-screen"
        style={{
          backgroundColor: '#273417', // Darker background for contrast
          backgroundImage: 'url(/fly4.png)',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay', // More dramatic blend mode
        }}
      >
        <div className="flex flex-col justify-center min-h-screen px-4 py-6">
          <div className="text-center py-8 max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">
              <a href="/" className="hover:underline">🪰🔥 Tactical Fly Elimination Directory</a>
            </h1>
            <p className="text-2xl mb-6 text-gray-300">
              Welcome to your ultimate guide for outsmarting and obliterating that pesky f* with style and a smile.
            </p>
          </div>
          
          {children}

          <SocialShare />
          <div className="text-center py-8 max-w-3xl mx-auto">
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
