import React, { memo, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import { ReactComponent as InfoIcon } from 'assets/icons/circle-info.svg'
import Modal from 'components/Modal'
import Switch from 'components/Switch'
import { actions } from 'modules/Form/slices'
import { HubAdvancedOpt } from 'modules/Form/types/hub'

const modalInfoTextDefault: string[] = []

interface Props {
  text?: string
  modalInfoText?: string[]
  checked: boolean
  updateKey: keyof HubAdvancedOpt
}

const SwitchItem = ({
  text = '',
  modalInfoText = modalInfoTextDefault,
  checked,
  updateKey,
}: Props) => {
  const dispatch = useDispatch()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const closeModal = useCallback(() => setIsOpenModal(false), [])

  const renderInfo = () => {
    return (
      <>
        <span
          className={clsx(
            'flex-none',
            'inline-flex items-center justify-center self-stretch',
            'p-1 pl-0 mr-1',
            'cursor-pointer',
          )}
          onClick={() => setIsOpenModal(true)}
        >
          <InfoIcon
            width={12}
            height={12}
            fill="var(--nc-primary)"
            className="inline-flex flex-none"
          />
        </span>

        <Modal isOpen={isOpenModal} onRequestClose={closeModal}>
          <>
            <div className="p-4 pb-0">
              {modalInfoText.map((info, index) => (
                <p key={index} className="mb-2 last:mb-0">
                  {info}
                </p>
              ))}
            </div>
            <div className="p-4">
              <button
                className={clsx(
                  'stardust-button-reset stardust-button stardust-button--primary',
                  'w-full',
                )}
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

  const onChangeChecked = useCallback(
    (isChecked: boolean) => {
      dispatch(
        actions.changeHubAdvancedOpt({
          isInclude: isChecked,
          key: updateKey,
        }),
      )
    },
    [updateKey],
  )

  return (
    <Switch checked={checked} onChangeChecked={onChangeChecked}>
      <span className="flex items-center mr-1">
        {renderInfo()}
        <span>{text}</span>
      </span>
    </Switch>
  )
}

export default memo(SwitchItem)
