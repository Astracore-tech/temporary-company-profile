import React from 'react'
import Link from 'next/link'
import BlogCard from './blogCard'
import { getAllPosts } from '@/utils/markdown'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

const Blog: React.FC = () => {
  const posts = getAllPosts(['title', 'date', 'excerpt', 'coverImage', 'slug']).slice(0, 3)

  return (
    <section className='border-b border-[var(--ac-line)] scroll-mt-24' id='blog'>
      <div className='ac-container'>
        <SectionHeading
          eyebrow='Our Journal'
          title={
            <>
              Latest
              <br />
              <span className='ac-muted-line'>Blog &amp; Insights</span>
            </>
          }
          description='Read our thoughts on software engineering, product design, and digital growth in East Africa.'
          aside={
            <Link href='/blog' className='ac-link'>
              View All Articles →
            </Link>
          }
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {posts.map((blog, i) => (
            <div
              key={blog.slug || i}
              data-aos='fade-up'
              data-aos-delay={`${i * 90}`}
              data-aos-duration='700'>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
