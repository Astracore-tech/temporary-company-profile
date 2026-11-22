import React from 'react'

type Props = {
  /** Quiet label above the title */
  eyebrow: string
  /** Section title — plain text, or JSX when a line break is needed */
  title?: React.ReactNode
  /** Supporting copy shown beside the title on wide screens */
  description?: React.ReactNode
  /** Optional trailing slot (a link, a count, a control) below the description */
  aside?: React.ReactNode
  /** Stack and centre everything instead of the default split layout */
  center?: boolean
  className?: string
}

/**
 * The single section header used across the site.
 * Eyebrow → title → supporting copy at one scale and rhythm.
 */
const SectionHeading = ({
  eyebrow,
  title,
  description,
  aside,
  center = false,
  className = '',
}: Props) => {
  if (center) {
    return (
      <div className={`flex flex-col items-center text-center mb-12 lg:mb-16 ${className}`}>
        <span className='ac-eyebrow'>{eyebrow}</span>
        {title && <h2 className='ac-h2 mt-4'>{title}</h2>}
        {description && <p className='ac-small mt-5 max-w-xl'>{description}</p>}
        {aside && <div className='mt-6'>{aside}</div>}
      </div>
    )
  }

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 lg:mb-16 ${className}`}>
      <div className='lg:col-span-7 min-w-0'>
        <span className='ac-eyebrow'>{eyebrow}</span>
        {title && <h2 className='ac-h2 mt-4'>{title}</h2>}
      </div>

      {(description || aside) && (
        <div className='lg:col-span-5 lg:pl-8'>
          {description && <p className='ac-small max-w-sm'>{description}</p>}
          {aside && <div className='mt-5'>{aside}</div>}
        </div>
      )}
    </div>
  )
}

export default SectionHeading
