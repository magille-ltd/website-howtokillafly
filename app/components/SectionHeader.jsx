import React from 'react';
import GradientText from './GradientText';

const SectionHeader = ({ children, className = '' }) => {
  return (
    <h2 className={`text-3xl font-military text-yellow-400 mb-8 text-center ${className}`}>
      <GradientText>{children}</GradientText>
    </h2>
  );
};

export default SectionHeader;
