import React from 'react';

const GradientText = ({ children, className = '', style = 'default' }) => {
  const baseClasses = 'inline-block font-extrabold';
  
  const defaultStyle = {
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    WebkitTextStroke: '1px rgba(0,0,0,0.1)',
    filter: 'brightness(1.2) contrast(1.1) saturate(1.2)',
  };

  const emojiStyle = {
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    WebkitTextStroke: '0.5px rgba(255,255,255,0.5)',
    filter: 'brightness(1.1) contrast(1.05) saturate(1.1)',
    fontSize: '1.3em',
  };

  const appliedStyle = style === 'emoji' ? emojiStyle : defaultStyle;
  const appliedClasses = style === 'emoji' 
    ? `${baseClasses} text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-yellow-400 to-orange-500`
    : `${baseClasses} text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600`;

  return (
    <span 
      className={`${appliedClasses} ${className}`}
      style={appliedStyle}
    >
      {children}
    </span>
  );
};

export default GradientText;
