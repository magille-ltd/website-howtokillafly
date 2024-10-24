import React from 'react';
import { useLocation } from '@remix-run/react';

const SocialShare = () => {
  const location = useLocation();
  //console.log({ location })
  const baseurl = "https://howtokillafly.com"
  const url = baseurl +location.pathname;

  return (
    <div className="flex justify-center space-x-4 mt-8">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 ease-in-out transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-yellow-400 hover:text-yellow-500"
        >
          <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.324V1.325C24 .595 23.405 0 22.675 0z" />
        </svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=Check%20out%20this%20awesome%20site!`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 ease-in-out transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-yellow-400 hover:text-yellow-500"
        >
          <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.573 4.897 4.897 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.918 4.918 0 004.588 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=Check%20out%20this%20awesome%20site!`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 ease-in-out transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-yellow-400 hover:text-yellow-500"
        >
          <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.77 24h20.46C23.208 24 24 23.226 24 22.271V1.729C24 .774 23.208 0 22.23 0zM7.12 20.452H3.56V9.034h3.56v11.418zM5.34 7.548a2.065 2.065 0 110-4.13 2.065 2.065 0 010 4.13zm14.112 12.904h-3.56v-5.604c0-1.336-.027-3.057-1.863-3.057-1.864 0-2.15 1.454-2.15 2.957v5.704h-3.56V9.034h3.42v1.56h.05c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.258z" />
        </svg>
      </a>
      <a
        href={`mailto:?subject=Check%20out%20this%20awesome%20site!&body=Check%20out%20this%20site%20${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 ease-in-out transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-yellow-400 hover:text-yellow-500"
        >
          <path d="M12 12.713l11.985-8.713H.015L12 12.713zm0 2.574L.015 6.574V18h23.97V6.574L12 15.287z" />
        </svg>
      </a>
    </div>
  );
};

export default SocialShare;
