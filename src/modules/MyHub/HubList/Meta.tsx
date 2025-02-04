import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'configStore'

import { ReactComponent as BookIcon } from 'assets/icons/book.svg'
import { ReactComponent as BookOpenIcon } from 'assets/icons/book-open.svg'
import { ReactComponent as TrashIcon } from 'assets/icons/trash-can.svg'
import ExpandBtn from 'components/Buttons/ExpandBtn'
import { isExpandAllHubSelector } from 'modules/Form/selectors'
import * as asThunk from 'modules/Form/slices/asyncThunk'
import { getDisplayDate } from 'utils/time'

interface Props {
  date?: string
  toggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  isOpenViewDetailIncome: boolean
  setIsOpenViewDetailIncome: React.Dispatch<React.SetStateAction<boolean>>
}

const Meta = ({
  date = '',
  toggle,
  setToggle,
  isOpenViewDetailIncome,
  setIsOpenViewDetailIncome,
}: Props) => {
  const dispatch: AppDispatch = useDispatch()

  const isExpandAllHub = useSelector(isExpandAllHubSelector)

  const displayDate = useMemo(
    () => getDisplayDate(new Date(+date), true),
    [date],
  )

  const onHandleDeleteHubByDate = useCallback(() => {
    dispatch(
      asThunk.deleteHubByDate({
        date,
      }),
    )
  }, [date])

  const deleteHubDate = () => {
    if (window.confirm) {
      const text = `Bạn có muốn xóa toàn bộ ca hub ngày ${displayDate} ?`
      const confirm = window.confirm(text)
      if (confirm) {
        onHandleDeleteHubByDate()
      }
    }
  }

  const toggleDetail = useCallback(() => {
    setToggle((toggle) => !toggle)
  }, [])

  useEffect(() => {
    setToggle(isExpandAllHub)
  }, [isExpandAllHub])

  useEffect(() => {
    if (!toggle) setIsOpenViewDetailIncome(false)
  }, [toggle])

  return (
    <>
      <ExpandBtn
        isDetail={toggle}
        toggleDetail={toggleDetail}
        textHide="(Ẩn)"
        textShow="(Xem thống kê ngày)"
      />
      <div className="flex items-center button-group ml-auto">
        {toggle && (
          <button
            className="stardust-button-reset stardust-button stardust-button--secondary"
            onClick={() => setIsOpenViewDetailIncome(!isOpenViewDetailIncome)}
          >
            {isOpenViewDetailIncome ? (
              <BookOpenIcon fill="var(--nc-primary)" width={14} height={14} />
            ) : (
              <BookIcon fill="var(--nc-primary)" width={14} height={14} />
            )}
          </button>
        )}

        <button
          className="stardust-button-reset stardust-button stardust-button--secondary"
          onClick={deleteHubDate}
        >
          <TrashIcon fill="var(--nc-error)" width={14} height={14} />
        </button>
      </div>
    </>
  )
}

export default memo(Meta)
