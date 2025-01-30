import React from 'react'
import Modal, { Props as ModalProps } from 'react-modal'

interface Props extends ModalProps {}

function BaseModal({ children, isOpen, ...rest }: Props) {
  return (
    <Modal isOpen={isOpen} {...rest}>
      {children}
    </Modal>
  )
}

export default BaseModal
