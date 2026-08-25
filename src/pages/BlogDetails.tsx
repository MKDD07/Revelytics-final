import React from 'react';
import {
  BlogDetailsHero,
  BlogDetailsPostbox,
  BlogDetailsBanner,
  Cta1,
} from '../components';

interface BlogDetailsProps {
  slug?: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ slug }) => {
  return (
    <>
      {/* Blog Details Header */}
      <BlogDetailsHero slug={slug} />

      {/* Full Article Content, Comments & Author Bio */}
      <BlogDetailsPostbox slug={slug} />

      {/* Featured Destination Banner */}
      <BlogDetailsBanner />

      {/* CTA */}
      <Cta1 />
    </>
  );
};

export default BlogDetails;
