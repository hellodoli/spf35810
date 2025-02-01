import React from 'react'
import Modal, { Props as ModalProps } from 'react-modal'

interface Props extends ModalProps {
  hasWrappContent?: boolean
}

function BaseModal({
  children,
  isOpen,
  hasWrappContent = true,
  ...rest
}: Props) {
  return (
    <Modal isOpen={isOpen} {...rest}>
      {hasWrappContent ? (
        <div className="modal-content bg-white dark:bg-slate-900 dark:text-slate-200">
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </Modal>
  )
}

export default BaseModal
