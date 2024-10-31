import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react"
import Layout from './components/Layout';
import "./tailwind.css";
import { useEffect, useRef } from 'react';
import { FlyJS } from './flyjs/flyjs.js';
import { SpeedInsights } from '@vercel/speed-insights/remix';

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=VT323&family=Black+Ops+One&display=swap",
  },
];

export const loader = () => {
  return {
    isProduction: process.env.NODE_ENV === "production",
  };
};

export function Document({ children }) {
  const { isProduction } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href="/ffavicon.png" type="image/png" />
        
        {isProduction && (
          <>
            <script defer data-domain="howtokillafly.com" src="https://plausible.io/js/script.outbound-links.js"></script>
            <script dangerouslySetInnerHTML={{__html: `
              window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
            `}} />
          </>
        )}
      </head>
      <body
        className="flex flex-col items-center justify-start text-white min-h-screen relative"
        style={{
          backgroundColor: '#273417',
          backgroundImage: 'url(/fly4.png)',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom right, rgba(50,50,50,0.2), rgba(0,0,0,0.3))',
            zIndex: 1,
          }}
        ></div>
        <div className="relative z-10 w-full">
          <Layout>{children}</Layout>
        </div>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default function App() {
  const flyJSRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!flyJSRef.current) {
        const container = document.body;
        flyJSRef.current = new FlyJS(container);
        console.log('FLYJS START! flyJSRef.current', flyJSRef.current);
        flyJSRef.current.start();
      }

      return () => {
        if (flyJSRef.current) {
          //console.log('FLYJS STOP! flyJSRef.current', flyJSRef.current);
          //flyJSRef.current.stop();
        }
      };
    }
  }, []);

  return (
    <Document>
      <Outlet />
    </Document>
  );
}
