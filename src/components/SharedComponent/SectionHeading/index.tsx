import React from 'react'

type Props = {
  /** Small accent label above the title */
  eyebrow: string
  title?: React.ReactNode
  /** Supporting copy beside (wide) or under (narrow) the title */
  description?: React.ReactNode
  /** Optional trailing slot, e.g. a link */
  aside?: React.ReactNode
  className?: string
}

/** The one section header used across the site. */
const SectionHeading = ({ eyebrow, title, description, aside, className = '' }: Props) => (
  <div
    className={`grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-4 lg:gap-16 lg:items-end mb-10 sm:mb-12 ${className}`}>
    <div>
      <p className='ac-eyebrow mb-3'>{eyebrow}</p>
      {title && <h2 className='ac-h2'>{title}</h2>}
    </div>
    {(description || aside) && (
      <div className='space-y-4'>
        {description && <p className='ac-body text-[var(--ac-ink-3)]'>{description}</p>}
        {aside}
      </div>
    )}
  </div>
)

export default SectionHeading
