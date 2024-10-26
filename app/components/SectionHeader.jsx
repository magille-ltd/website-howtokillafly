import React from 'react';

export default function SectionHeader({ children }) {
  return (
    <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">
      {children}
    </h2>
  );
}
