import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import { ExpandBtn } from 'components/Buttons'
import FormItem from 'components/FormItem'
import { InputNumber } from 'components/Input'
import { ELE_CLASSNAMES } from 'modules/Form/constants'
import {
  hubExtraIncomeArrSelector,
  hubExtraIncomeSelector,
  quickExtraIncomeLabelListSelector,
} from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { ExtraIncomeLabel, FORM_ACTION } from 'modules/Form/types'
import { getFormat } from 'utils/price'
import Labels from './Labels'

type Handle = {
  handleOffActiveFocus: () => void
  handleOnActiveFocus: () => void
}

interface QuickAddExtraIncomeBtnItem {
  id: string
  price: number
}

const step = 1000 // 1000 VND
const max = 100000000 // 100 Million VND

const quickAddExtraIncomeBaseArr = [1000, 2000, 3000, 5000, 10000, 15000]
const quickAddExtraIncomeBtnArr: QuickAddExtraIncomeBtnItem[] =
  quickAddExtraIncomeBaseArr.map((price) => ({
    id: `quickAddExtraIncome_${price}`,
    price,
  }))

interface Props {
  type?: FORM_ACTION
}

const ExtraIncome = ({ type = FORM_ACTION.ADD }: Props) => {
  const f = getFormat()
  const dispatch = useDispatch()

  const labelList = useSelector(quickExtraIncomeLabelListSelector)
  const extraIncome = useSelector(hubExtraIncomeSelector)
  const extraIncomeArr = useSelector(hubExtraIncomeArrSelector)

  const parentRef = useRef<Handle>(null)
  const cache = useRef({ labelId: '', labelText: '' })

  const [toggle, setToggle] = useState(false)
  const [activeQuickPrice, setActiveQuickPrice] = useState(0)
  const [customQuickPrice, setCustomQuickPrice] = useState(0)

  const disabledAdd = !activeQuickPrice && !customQuickPrice
  const addPrice = activeQuickPrice || customQuickPrice

  const toggleDetail = useCallback(() => setToggle((toggle) => !toggle), [])

  // quick price
  const handleOffActiveQuickPrice = useCallback(
    () => setActiveQuickPrice(0),
    [],
  )
  const quickAddPrice = useCallback((price: number) => {
    setActiveQuickPrice(price)
    if (typeof parentRef.current?.handleOffActiveFocus === 'function')
      parentRef.current.handleOffActiveFocus()
  }, [])

  // custom quick price
  const quickOnFocus = useCallback(() => {
    handleOffActiveQuickPrice()
  }, [handleOffActiveQuickPrice])
  const quickOnChangeInput = useCallback(
    (price: number) => {
      handleOffActiveQuickPrice()
      setCustomQuickPrice(price)
    },
    [handleOffActiveQuickPrice],
  )

  // label
  const onChangeLabelId = useCallback((label?: ExtraIncomeLabel) => {
    cache.current.labelId = label?.id || ''
    cache.current.labelText = label?.text || ''
  }, [])

  //add
  const handleAdd = () => {
    const labelId = cache.current.labelId
    const labelText = cache.current.labelText
    dispatch(
      actions.addHubExtraIncome({
        price: addPrice,
        labelId,
        labelText,
      }),
    )
  }

  // delete
  const handleDelete = (id: string) => {
    dispatch(
      actions.deleteHubExtraIncome({
        id,
      }),
    )
  }

  return (
    <FormItem
      label="Thu nhập khác:"
      className={`form-type-${type.toLowerCase()} ${ELE_CLASSNAMES.HUB_EXTRA_INCOME}`}
    >
      <div className="border-line p-2">
        <FormItem>
          <div className="flex items-center gap-1">
            <div
              className="text-lg"
              style={{ color: 'var(--spf-textPrimary)' }}
            >
              {f(extraIncome)}
            </div>
            {!!extraIncome && (
              <ExpandBtn isDetail={toggle} toggleDetail={toggleDetail} />
            )}
          </div>
          {toggle && (
            <div className="w-full flex items-center flex-wrap gap-1 mt-4">
              {extraIncomeArr.map((extraIncome) => {
                const label = labelList[extraIncome.labelId]
                return (
                  <button
                    key={extraIncome.id}
                    className={clsx(
                      'flex items-center',
                      'stardust-button-reset stardust-button',
                      'whitespace-nowrap',
                    )}
                    style={{
                      color: label?.color || '',
                      borderColor: label?.color || '',
                      background: 'transparent',
                    }}
                  >
                    <span className="mr-1">{`${extraIncome.labelText}: `}</span>
                    <span className="mr-2">{f(extraIncome.price)}</span>
                    <span
                      className={clsx(
                        'delete-button always-visible rounded-full w-[12px] h-[12px]',
                        'flex items-center justify-center',
                        'cursor-pointer border-line p-1 text-xs select-none',
                      )}
                      onClick={() => handleDelete(extraIncome.id)}
                    >
                      <small>x</small>
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </FormItem>
        <FormItem label="Số tiền:">
          <div className="flex items-center flex-wrap gap-1">
            {quickAddExtraIncomeBtnArr.map(({ id, price }) => {
              return (
                <button
                  key={id}
                  className={clsx(
                    'flex items-center justify-center',
                    'stardust-button-reset stardust-button stardust-button--secondary',
                    'whitespace-nowrap',
                    'h-8',
                    {
                      'stardust-button--active': activeQuickPrice === price,
                    },
                  )}
                  onClick={() => quickAddPrice(price)}
                >
                  {`${f(price)}`}
                </button>
              )
            })}
            <InputNumber
              max={max}
              onChangeInput={quickOnChangeInput}
              isCounterMobile={true}
              step={step}
              inline={true}
              wrapperClassName="!h-8"
              activeWhenFocus={true}
              onFocus={quickOnFocus}
              parentRef={parentRef}
            />
          </div>
        </FormItem>
        <FormItem label="Loại thu nhập:">
          <Labels onChangeLabelId={onChangeLabelId} />
        </FormItem>
        <FormItem>
          <button
            className={clsx(
              'stardust-button-reset stardust-button stardust-button--primary',
              'w-full lg:w-auto',
            )}
            disabled={disabledAdd}
            onClick={handleAdd}
          >
            {`Thêm: ${f(addPrice)}`}
          </button>
        </FormItem>
      </div>
    </FormItem>
  )
}

export default ExtraIncome
