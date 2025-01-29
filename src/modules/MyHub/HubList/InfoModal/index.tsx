import React, { useState } from 'react'
import Modal from 'react-modal'

import { ReactComponent as CartShoppingIcon } from 'assets/icons/cart-shopping.svg'
import { ReactComponent as InfoIcon } from 'assets/icons/circle-info.svg'
import { ReactComponent as EnviraIcon } from 'assets/icons/envira.svg'
import { ReactComponent as GearIcon } from 'assets/icons/gear.svg'
import { ReactComponent as ShieldIcon } from 'assets/icons/shield-halved.svg'
import { HUB_COLORS } from 'modules/Form/constants'
import { HUB_TYPE } from 'modules/Form/types/enum'

const icons = [
  { id: 'icon-1', icon: CartShoppingIcon, text: 'Phí giao hàng' },
  { id: 'icon-2', icon: GearIcon, text: 'Thu nhập đơn vượt mốc' },
  { id: 'icon-3', icon: EnviraIcon, text: 'Thu nhập đơn ghép vượt mốc' },
  {
    id: 'icon-4',
    icon: ShieldIcon,
    text: 'Ca HUB có đảm bảo thu nhập từ SPF (dành cho HUB 8 và HUB 10)',
    fill: HUB_COLORS[HUB_TYPE.HUB_8],
  },
]

const InfoModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        className="stardust-button-reset stardust-button stardust-button--ghost ml-auto"
        onClick={() => setIsOpen(!modalIsOpen)}
      >
        <InfoIcon width={14} height={14} fill="var(--nc-primary)" />
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="modal-content">
          <div className="modal-header text-base">
            <strong>Chú thích biểu tượng</strong>
            <button
              type="button"
              className="close text-xl"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="p-4">
            {icons.map((icon) => {
              const Icon = icon.icon
              const fill = icon.fill || 'var(--nc-primary)'
              return (
                <div key={icon.id} className="flex mt-1 first:mt-0">
                  <Icon
                    width={14}
                    height={14}
                    fill={fill}
                    className="flex-none"
                  />
                  <span className="ml-1 mr-2">:</span>
                  <span className="italic">{icon.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default InfoModal
