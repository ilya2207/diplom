import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Box,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react'
import React from 'react'

const ManageCarModelModal = ({ isOpen, closeClickHandler, changeState, state }) => {
  return (
    <Modal isOpen={isOpen} onClose={closeClickHandler} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить модель</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Название"
            value={state.title}
            onChange={(e) => changeState('title', e.target.value)}
          />
          <Input
            className="mt-2"
            placeholder="Модель"
            value={state.model}
            onChange={(e) => changeState('model', e.target.value)}
          />
          <Box>
            <Text className="mt-2">Изображение</Text>
            <label
              className="cursor-pointer mt-3 p-4 flex justify-center items-center border-2 border-dashed"
              htmlFor="uploadFile"
            >
              Выберите изображение
            </label>
            <input
              className="overflow-hidden w-0 h-0 opacity-0 absolute"
              type="file"
              name="uploadFile"
              id="uploadFile"
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={closeClickHandler}>
            Отмена
          </Button>
          <Button colorScheme="blue">Добавить</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ManageCarModelModal
