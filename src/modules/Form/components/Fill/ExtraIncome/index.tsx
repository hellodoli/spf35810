import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import FormItem from 'components/FormItem'
import { InputNumber } from 'components/Input'
import { hubExtraIncomeSelector } from 'modules/Form/selectors'
import { actions } from 'modules/Form/slices'
import { FORM_ACTION } from 'modules/Form/types/enum'
import { getFormat } from 'utils/price'

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

const Tip = ({ type = FORM_ACTION.ADD }: Props) => {
  const f = getFormat()
  const dispatch = useDispatch()
  const extraIncome = useSelector(hubExtraIncomeSelector)

  const onChangeInput = useCallback((price: number) => {
    console.log('ONCHANGEINPUT: >>>', { price })
    dispatch(
      actions.changeHubExtraIncome({
        price,
      }),
    )
  }, [])

  const handleQuickAdd = useCallback((price: number) => {
    dispatch(
      actions.addHubExtraIncome({
        price,
      }),
    )
  }, [])

  return (
    <FormItem
      label="Thu nhập khác:"
      className={`form-type-${type.toLowerCase()}`}
    >
      <div className="border-line p-2">
        <InputNumber
          max={max}
          initValue={extraIncome}
          onChangeInput={onChangeInput}
          isCounterMobile={true}
          step={step}
          resetCount={1}
        />
        <FormItem label="Thêm nhanh:">
          <div className="flex items-center flex-wrap gap-1 min-h-[30px]">
            {quickAddExtraIncomeBtnArr.map(({ id, price }) => {
              return (
                <button
                  key={id}
                  className={clsx(
                    'flex items-center justify-center',
                    'stardust-button-reset stardust-button stardust-button--primary',
                    'whitespace-nowrap',
                  )}
                  onClick={() => handleQuickAdd(price)}
                >
                  {`${f(price)}`}
                </button>
              )
            })}
          </div>
        </FormItem>
      </div>
    </FormItem>
  )
}

export default Tip
