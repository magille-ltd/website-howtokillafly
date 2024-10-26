import { Link } from "@remix-run/react";
import SocialShare from './SocialShare';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-center min-h-screen px-4 py-6">
      <div className="text-center py-8 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg">
          <Link to="/" className="hover:underline">🪰🔥 Tactical Fly Elimination Directory</Link>
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
    </div>
  );
}
