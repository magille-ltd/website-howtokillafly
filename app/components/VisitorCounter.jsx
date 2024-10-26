import React, { useState, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';

const VisitorCounter = () => {
  const [count, setCount] = useState(0);
  const fetcher = useFetcher();

  useEffect(() => {
    // Increment the counter when the component mounts (real user visit)
    fetcher.submit({}, { method: 'post', action: '/api/visitorCount' });
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      console.log('fetcher.data', fetcher.data);
      setCount(fetcher.data.count);
    }
  }, [fetcher.data]);

  return (
    <div className="inline-flex items-center px-6 py-0 border-4 border-olive-800 bg-khaki-300 text-army-600 font-bold rounded-lg shadow-md text-4xl">
      <span className="font-digital text-4xl">
        {fetcher.data ? fetcher.data.count.toString().padStart(5, '0') : '00000'} Visitors
      </span>
    </div>
  );
};

export default VisitorCounter;
