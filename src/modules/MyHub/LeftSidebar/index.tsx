import React from 'react'
import BackBtnGroup from 'components/BackBtnGroup'
import Calendar from './Calendar'
import Buttons from './Buttons'
import DateSelectNote from './DateSelectNote'
import FilterHub from './FilterHub'

const LeftSidebar = () => {
  return (
    <nav>
      <div className="mb-4 flex items-center justify-center">
        <BackBtnGroup />
      </div>
      <div className="my-hub-calendar flex items-center justify-center mb-4">
        <Calendar />
      </div>
      <div className="my-hub-filter">
        <div className="p-3 border-line rounded-sm">
          <div className="mb-4">
            <div className="mb-1 italic">Lọc theo loại:</div>
            <FilterHub />
          </div>
          <div className="mb-3">
            <div className="mb-1 italic">Lọc theo thời gian:</div>
            <Buttons />
          </div>
          <DateSelectNote />
        </div>
      </div>
    </nav>
  )
}

export default LeftSidebar
