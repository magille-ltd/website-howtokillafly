import React from 'react';
import { Link } from '@remix-run/react';

export default function NavLink({ to, direction, title, children }) {
  return (
    <Link
      to={to}
      className={`bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700 transition-colors flex items-center h-full w-full ${direction === 'next' ? 'justify-end' : ''}`}
    >
      {direction === 'prev' && <div className="mr-4 text-yellow-400 text-2xl">&larr;</div>}
      <div className={`${direction === 'next' ? 'text-right' : ''}`}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">{title}</h3>
        <p className="text-white">{children}</p>
      </div>
      {direction === 'next' && <div className="ml-4 text-yellow-400 text-2xl">&rarr;</div>}
    </Link>
  );
}
