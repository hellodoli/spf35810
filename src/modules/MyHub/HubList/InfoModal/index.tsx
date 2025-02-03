import React, { memo, useCallback, useState } from 'react'

import { ReactComponent as BookIcon } from 'assets/icons/book.svg'
import { ReactComponent as BookOpenIcon } from 'assets/icons/book-open.svg'
import { ReactComponent as CalendarXmark } from 'assets/icons/calendar-xmark.svg'
import { ReactComponent as CartShoppingIcon } from 'assets/icons/cart-shopping.svg'
import { ReactComponent as InfoIcon } from 'assets/icons/circle-info.svg'
import { ReactComponent as EnviraIcon } from 'assets/icons/envira.svg'
import { ReactComponent as GearIcon } from 'assets/icons/gear.svg'
import { ReactComponent as ShieldIcon } from 'assets/icons/shield-halved.svg'
import Modal from 'components/Modal'
import { HUB_COLORS } from 'modules/Form/constants'
import { HUB_TYPE } from 'modules/Form/types/enum'
import Row from './Row'

let iconIndex = 0

const icons = [
  { icon: CartShoppingIcon, text: 'Phí giao hàng' },
  { icon: GearIcon, text: 'Thu nhập đơn vượt mốc' },
  { icon: EnviraIcon, text: 'Thu nhập đơn ghép vượt mốc' },
  {
    icon: ShieldIcon,
    text: 'Ca HUB có đảm bảo thu nhập từ SPF (HUB 8)',
    fill: HUB_COLORS[HUB_TYPE.HUB_8],
  },
  {
    icon: ShieldIcon,
    text: 'Ca HUB có đảm bảo thu nhập từ SPF (HUB 10)',
    fill: HUB_COLORS[HUB_TYPE.HUB_10],
  },
  {
    icon: CalendarXmark,
    text: 'Ca HUB không được tính vào thưởng tuần',
  },
  {
    icon: BookIcon,
    text: 'Chi tiết thu nhập ngày đang đóng',
  },
  {
    icon: BookOpenIcon,
    text: 'Chi tiết thu nhập ngày đang mở',
  },
].map((icon) => {
  iconIndex += 1
  return {
    ...icon,
    id: `icon-explain-${iconIndex}`,
  }
})

const InfoModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <button
        className="stardust-button-reset stardust-button stardust-button--ghost ml-auto"
        onClick={() => setIsOpen(!modalIsOpen)}
      >
        <InfoIcon width={14} height={14} fill="var(--nc-primary)" />
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <>
          <div className="modal-header text-base">
            <strong>Chú thích biểu tượng</strong>
          </div>
          <div className="p-4">
            {icons.map((icon) => {
              return (
                <Row
                  key={icon.id}
                  icon={icon.icon}
                  fill={icon.fill}
                  text={icon.text}
                />
              )
            })}
          </div>
          <div className="p-4">
            <button
              className="stardust-button-reset stardust-button stardust-button--primary w-full"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </>
      </Modal>
    </>
  )
}

export default memo(InfoModal)
