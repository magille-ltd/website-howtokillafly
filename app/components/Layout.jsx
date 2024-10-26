import { Link, useLocation } from "@remix-run/react";
import SocialShare from './SocialShare';
import ReactionComponent from './ReactionComponent';
import GradientText from './GradientText';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-center min-h-screen px-4 py-6">
      <div className="text-center py-8 max-w-3xl mx-auto">
        <div className="text-5xl font-military mb-8 text-yellow-400 drop-shadow-lg">
          <Link to="/">
            <span className="text-6xl">🪰🔥</span><br/>
            <h1 className="">
              <GradientText>Tactical Fly Elimination Directory</GradientText>
            </h1>
          </Link>
        </div>
        <p className="text-2xl mb-6 text-gray-300 font-military">
          Your ultimate guide for outsmarting and obliterating that pesky mother f* with style and a smile.
        </p>
      </div>
      
      {children}

      {location.pathname === '/' && (
        <div className="mt-8 mb-4 text-center mx-auto">
          <ReactionComponent itemType="page" itemId={location.pathname} />
        </div>
      )}

      <SocialShare />
      <div className="text-center py-8 max-w-3xl mx-auto mt-8">
        <p className="text-2xl mb-6 text-gray-300">
          &copy; {new Date().getFullYear()} Tactical Fly Elimination Directory. All rights reserved.
        </p>
      </div>
    </div>
  );
}
