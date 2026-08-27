import React from 'react'
import Image from 'next/image'
import { Blog } from '@/types/blog'
import { format } from 'date-fns'
import Link from 'next/link'
import { getImgPath } from '@/utils/image'

const BlogCard = ({ blog, priority = false }: { blog: Blog; priority?: boolean }) => {
  const { title, coverImage, excerpt, date, slug } = blog

  return (
    <article className='group ac-card ac-card-body h-full'>
      <div className='ac-media ac-media-plain relative aspect-video shrink-0'>
        <Link
          href={`/blog/${slug}`}
          aria-label={title || 'Blog post'}
          className='block w-full h-full relative'>
          <Image
            src={getImgPath(coverImage || '')}
            alt={title || ''}
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            priority={priority}
            unoptimized
          />
        </Link>
      </div>

      <div className='flex flex-col flex-1 p-7'>
        <div className='flex items-center gap-2.5 mb-4'>
          <span className='w-1 h-1 rounded-full bg-[var(--ac-accent)]' />
          <span className='text-[var(--ac-accent)] text-[10px] font-semibold tracking-[0.22em] uppercase'>
            Insights
          </span>
        </div>

        <h3 className='ac-h3 mb-3 line-clamp-2'>
          <Link
            href={`/blog/${slug}`}
            className='hover:text-[var(--ac-accent)] transition-colors'>
            {title}
          </Link>
        </h3>

        <p className='ac-small line-clamp-2 mb-6'>{excerpt}</p>

        <div className='ac-card-foot pt-4 border-t border-[var(--ac-line)] flex items-center justify-between gap-4'>
          <time
            className='text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ac-ink-4)]'
            dateTime={date ? new Date(date).toISOString() : undefined}>
            {date ? format(new Date(date), 'dd MMM yyyy') : ''}
          </time>
          <span className='text-[11px] font-bold text-[var(--ac-ink-4)] group-hover:text-[var(--ac-accent)] transition-colors'>
            Read →
          </span>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
