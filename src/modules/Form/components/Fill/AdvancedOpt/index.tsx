import React, { useCallback, useState } from 'react'

import ExpandBtn from 'components/Buttons/ExpandBtn'
import FormItem from 'components/FormItem'
import Switches from './Switches'

const AdvancedOpt = () => {
  const [isDetail, setIsDetail] = useState(false)
  const toggleDetail = useCallback(() => {
    setIsDetail((isDetail) => !isDetail)
  }, [])

  return (
    <FormItem contentColor="">
      <div className="border-line p-2">
        <ExpandBtn
          isDetail={isDetail}
          toggleDetail={toggleDetail}
          textHide="(Bấm đế ẩn)"
          textShow="(Bấm để mở Tùy chỉnh nâng cao)"
        />
        {isDetail && <Switches />}
      </div>
    </FormItem>
  )
}

export default AdvancedOpt
