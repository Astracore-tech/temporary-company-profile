'use client'
import React, { useState } from 'react'
import PortfolioCard, {
  ALL_WORK,
  PORTFOLIO_FILTERS,
} from '@/components/SharedComponent/portfollio/Portfolio-card'
import PortfolioFilters from '@/components/SharedComponent/portfollio/PortfolioFilters'

const PortfolioList = () => {
  const [activeFilter, setActiveFilter] = useState(ALL_WORK)

  return (
    <section id='portfolio' className='scroll-mt-24'>
      <div className='ac-container'>
        <h2 className='sr-only'>All projects</h2>
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

export default PortfolioList
