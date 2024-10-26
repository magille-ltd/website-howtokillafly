import React from 'react';

export default function ContentContainer({ children }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="text-left">
        {children}
      </div>
    </div>
  );
}
