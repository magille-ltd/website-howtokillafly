import React from 'react';
import { Link } from "@remix-run/react";
import SectionHeader from './SectionHeader';

export default function LearnMoreSection() {
  return (
    <section className="mb-8">
      <SectionHeader>Learn More</SectionHeader>
      <p className="text-gray-300 mb-4 text-center">
        Check out our blog for more tips, tricks, and insights into the world of fly elimination!
      </p>
      <div className="text-center">
        <Link
          to="/blog"
          className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 transition duration-300 inline-block"
        >
          Visit Our Blog
        </Link>
      </div>
    </section>
  );
}
