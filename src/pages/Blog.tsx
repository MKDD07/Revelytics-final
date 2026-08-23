import React from 'react';
import {
  BlogHero,
  BlogGrid,
  Cta1,
} from '../components';

const Blog: React.FC = () => {
  return (
    <>
      {/* Blog Page Hero */}
      <BlogHero />

      {/* Travel Industry Insights Grid */}
      <BlogGrid />

      {/* Subscribe & Contact CTA */}
      <Cta1 />
    </>
  );
};

export default Blog;
