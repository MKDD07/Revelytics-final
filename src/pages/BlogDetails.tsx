import React from 'react';
import {
  BlogDetailsHero,
  BlogDetailsPostbox,
  BlogDetailsBanner,
  Cta1,
} from '../components';

const BlogDetails: React.FC = () => {
  return (
    <>
      {/* Blog Details Header */}
      <BlogDetailsHero />

      {/* Full Article Content, Comments & Author Bio */}
      <BlogDetailsPostbox />

      {/* Featured Destination Banner */}
      <BlogDetailsBanner />

      {/* CTA */}
      <Cta1 />
    </>
  );
};

export default BlogDetails;
