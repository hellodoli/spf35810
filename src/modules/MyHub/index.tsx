import React from 'react'

import LeftSidebar from './LeftSidebar'
import HubList from './HubList'

const MyHub = () => {
  return (
    <div className="my-hub lg:flex overflow-hidden">
      <div className="flex-[0_0_auto] w-full lg:w-[30%] p-4 overflow-hidden lg:fixed lg:left-0 lg:top-0 lg:h-[100vh]">
        <LeftSidebar />
      </div>
      <div className="flex-[0_0_auto] w-full lg:w-[70%] p-4 ml-auto">
        <HubList />
      </div>
    </div>
  )
}

export default MyHub
