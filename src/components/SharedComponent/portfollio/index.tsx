'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import PortfolioCard, {
  ALL_WORK,
  PORTFOLIO_FILTERS,
} from '@/components/SharedComponent/portfollio/Portfolio-card'
import SectionHeading from '@/components/SharedComponent/SectionHeading'
import PortfolioFilters from '@/components/SharedComponent/portfollio/PortfolioFilters'

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState(ALL_WORK)

  return (
    <section id='portfolio' className='border-b border-[var(--ac-line)] scroll-mt-24'>
      <div className='ac-container'>
        <SectionHeading
          eyebrow='Our Work'
          title={
            <>
              Premium
              <br />
              <span className='ac-muted-line'>Work Showcase</span>
            </>
          }
          description='Meticulously crafted software solutions for industry-leading enterprises across Africa and beyond.'
          aside={
            <Link href='/portfolio' className='ac-link'>
              View All Work →
            </Link>
          }
        />

        <PortfolioFilters
          filters={PORTFOLIO_FILTERS}
          active={activeFilter}
          onChange={setActiveFilter}
          className='mb-8'
        />

        <PortfolioCard activeFilter={activeFilter} />
      </div>
    </section>
  )
}

export default Portfolio
