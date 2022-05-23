import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { OrderStatusType } from 'types/order.types'

interface Props {
  isOpen: boolean
  submitHandler: (orderId: number, status: OrderStatusType, rejectedMessage: string) => void
  onClose: () => void
  orderId: number
}

const RejectOrderModal: React.FC<Props> = ({ isOpen, submitHandler, onClose, orderId }) => {
  const [statusMessage, setStatusMessage] = useState('')
  const clickHandler = () => {
    submitHandler(orderId, 'rejected', statusMessage)
    setStatusMessage('')
  }
  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Отклонение заказа</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>Введите причину отклонения заказа</FormLabel>
          <Input
            value={statusMessage}
            isInvalid={statusMessage === ''}
            onChange={(e) => setStatusMessage(e.target.value)}
          />
          <Box className="mt-4 justify-end gap-2 flex">
            <Button onClick={onClose}>Отмена</Button>
            <Button disabled={statusMessage === ''} colorScheme={'blue'} onClick={clickHandler}>
              Подтвердить
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default RejectOrderModal
