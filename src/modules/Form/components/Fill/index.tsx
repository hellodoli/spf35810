import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import {
  isOpenPreviewSelector,
  isCalModeSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { FORM_ACTION } from 'modules/Form/types'

import Joins from 'modules/Form/components/Joins'
import PreviewContainer from 'modules/Form/components/Preview/PreviewContainer'
import Preview from 'modules/Form/components/Preview'
import BackBtnGroup from 'components/BackBtnGroup'
import Order from './Order'
import HubType from './HubType'
import HubSelect from './HubSelect'
import HubTime from './HubTime'
import Meta from './Meta'
import Kpi from './Kpi'
import AutoCompensate from './AutoCompensate'

interface FillProps {
  type?: FORM_ACTION
  isCalMode?: boolean
  hubId?: string
}

const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const isOpen = useSelector(isOpenPreviewSelector)

  useEffect(() => {
    return () => {
      dispatch(actions.resetHubFill())
    }
  }, [])

  return (
    <div
      className={clsx('flex-[0_0_auto] p-4', 'transition-all', {
        'w-full lg:w-[60%]': isOpen,
        'w-full lg:w-[80%] lg:mr-auto': !isOpen,
      })}
    >
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

const Fill = ({
  type = FORM_ACTION.ADD,
  isCalMode = false,
  hubId = '',
}: FillProps) => {
  return (
    <>
      <div className="flex-none w-full p-4 pb-0">
        <BackBtnGroup />
      </div>
      <div className={`hub-form lg:flex overflow-hidden ${type}`}>
        <ContainerLayout>
          <>
            {/* Kpi có đạt hay không */}
            <Kpi />
            {/* Loại hub */}
            <HubType type={type} />
            {/* Chế độ bù đơn */}
            <AutoCompensate />
            {/* Số lượng đơn */}
            <Order type={type} />
            {!isCalMode && (
              <>
                {/* Ngày làm việc */}
                <HubTime />
                {/* Ca (thời gian) hoạt động hub */}
                <HubSelect type={type} hubId={hubId} />
              </>
            )}
            {/* Đơn ghép */}
            <Joins />
            {/* Meta zone */}
            <Meta type={type} hubId={hubId} />
          </>
        </ContainerLayout>
        {/* Preview (right)*/}
        <PreviewContainer>
          <Preview />
        </PreviewContainer>
      </div>
    </>
  )
}

const FillCal = () => {
  const isCalMode = useSelector(isCalModeSelector)
  if (!isCalMode) return null
  return <Fill isCalMode={true} />
}

export default Fill
export { Fill, FillCal }
