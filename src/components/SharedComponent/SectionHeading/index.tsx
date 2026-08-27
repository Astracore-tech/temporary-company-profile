import React from 'react'

type Props = {
  /** Small accent label above the title */
  eyebrow: string
  /** Section title — plain text, or JSX when a line break is needed */
  title?: React.ReactNode
  /** Supporting copy shown opposite the title on wide screens */
  description?: React.ReactNode
  /** Optional trailing slot (a link, a count, a control) below the description */
  aside?: React.ReactNode
  /** Stack and centre everything instead of the default split layout */
  center?: boolean
  className?: string
}

/**
 * The single section header used across the site.
 * Keeps eyebrow → title → supporting copy at one consistent scale and rhythm
 * so every section opens the same way.
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
      <div className={`flex flex-col items-center text-center mb-14 ${className}`}>
        <span className='ac-eyebrow' data-aos='fade-up' data-aos-duration='700'>
          {eyebrow}
        </span>
        {title && (
          <h2 className='ac-h2 mt-6' data-aos='fade-up' data-aos-delay='80' data-aos-duration='700'>
            {title}
          </h2>
        )}
        {description && (
          <p
            className='ac-body mt-6 max-w-2xl'
            data-aos='fade-up'
            data-aos-delay='140'
            data-aos-duration='700'>
            {description}
          </p>
        )}
        {aside && <div className='mt-8'>{aside}</div>}
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16 mb-14 ${className}`}>
      <div className='min-w-0'>
        <span className='ac-eyebrow' data-aos='fade-up' data-aos-duration='700'>
          {eyebrow}
        </span>
        {title && (
          <h2 className='ac-h2 mt-6' data-aos='fade-up' data-aos-delay='80' data-aos-duration='700'>
            {title}
          </h2>
        )}
      </div>

      {(description || aside) && (
        <div
          className='lg:max-w-sm lg:text-right shrink-0'
          data-aos='fade-up'
          data-aos-delay='140'
          data-aos-duration='700'>
          {description && <p className='ac-small leading-relaxed'>{description}</p>}
          {aside && <div className='mt-6 flex lg:justify-end'>{aside}</div>}
        </div>
      )}
    </div>
  )
}

export default SectionHeading
