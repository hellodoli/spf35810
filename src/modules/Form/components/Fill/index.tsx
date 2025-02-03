import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import BackBtnGroup from 'components/BackBtnGroup'
import Joins from 'modules/Form/components/Joins'
import Preview from 'modules/Form/components/Preview'
import PreviewContainer from 'modules/Form/components/Preview/PreviewContainer'
import {
  isCalModeSelector,
  isOpenPreviewSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { FORM_ACTION } from 'modules/Form/types'
import AdvancedOpt from './AdvancedOpt'
import AutoCompensate from './AutoCompensate'
import HubSelect from './HubSelect'
import HubTime from './HubTime'
import HubType from './HubType'
import Kpi from './Kpi'
import Meta from './Meta'
import Order from './Order'

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
        <BackBtnGroup type={type} hubId={hubId} />
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
            {/* Tùy chỉnh nâng cao */}
            {!isCalMode && <AdvancedOpt />}
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
