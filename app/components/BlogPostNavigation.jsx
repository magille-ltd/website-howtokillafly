import React from 'react';
import NavLink from './NavLink';

export default function BlogPostNavigation({ prevPost, nextPost }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {prevPost ? (
        <NavLink to={`/blog/${prevPost.id}`} direction="prev" title="Previous Post">
          {prevPost.title}
        </NavLink>
      ) : (
        <div></div> // Empty div to maintain grid structure
      )}
      {nextPost && (
        <NavLink to={`/blog/${nextPost.id}`} direction="next" title="Next Post">
          {nextPost.title}
        </NavLink>
      )}
    </div>
  );
}
