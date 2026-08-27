import React from 'react'
import BlogCard from '@/components/SharedComponent/Blog/blogCard'
import { getAllPosts } from '@/utils/markdown'

const BlogList: React.FC = () => {
  const posts = getAllPosts(['title', 'date', 'excerpt', 'coverImage', 'slug'])

  return (
    <section id='blog'>
      <div className='ac-container'>
        <h2 className='sr-only'>All articles</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {posts.map((blog, i) => (
            <div
              key={blog.slug || i}
              data-aos='fade-up'
              data-aos-delay={`${(i % 3) * 90}`}
              data-aos-duration='700'>
              <BlogCard blog={blog} priority={i < 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogList
