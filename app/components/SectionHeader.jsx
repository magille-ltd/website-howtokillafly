import React from 'react';

const SectionHeader = ({ children, className = '' }) => {
  return (
    <h2 className={`text-3xl font-military text-yellow-400 mb-4 text-center ${className}`}>
      {children}
    </h2>
  );
};

export default SectionHeader;
