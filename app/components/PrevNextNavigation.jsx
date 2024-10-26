import React from 'react';
import NavLink from './NavLink';

export default function PrevNextNavigation({ prevItem, nextItem, basePath }) {
  const getTitle = (item) => item.title || item.name;
  const getLink = (item) => `/${basePath}${basePath ? '/' : ''}${item.id}`;

  return (
    <div className="grid grid-cols-2 gap-4">
      {prevItem ? (
        <NavLink to={getLink(prevItem)} direction="prev" title="Previous">
          {getTitle(prevItem)}
        </NavLink>
      ) : (
        <div></div> // Empty div to maintain grid structure
      )}
      {nextItem && (
        <NavLink to={getLink(nextItem)} direction="next" title="Next">
          {getTitle(nextItem)}
        </NavLink>
      )}
    </div>
  );
}
