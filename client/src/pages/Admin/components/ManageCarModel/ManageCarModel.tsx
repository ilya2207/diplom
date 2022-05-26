// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addModel, deleteModel, editModel, fetchModel } from 'store/model/model.action'
import ListItemRow from 'components/ListItemRow/ListItemRow'
import { IAddModelModal } from './types'
import { addBrand } from 'store/model/model.slice'

const editableInitState = {
  title: '',
  model: '',
  newImg: null,
  releaseDate: '',
}

const ManageCarModel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { items } = useAppSelector((state) => state.model)
  const dispatch = useAppDispatch()
  const [editableElement, setEditableElement] = useState<Partial<IAddModelModal>>(editableInitState)
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchModel())
    }
  }, [])

  const changeModalState = (key, value) => {
    if (key === 'newImg') {
      if (value[0]) {
        value = URL.createObjectURL(value[0])
      }
    }

    setEditableElement((prevState) => ({ ...prevState, [key]: value }))
  }

  const editClickHandler =
    (element: Partial<IAddModelModal> = editableInitState, brandId?: number | undefined) =>
    () => {
      if (brandId) setEditableElement({ ...element, brandId })
      else setEditableElement(element)
      onOpen()
    }

  const closeClickHandler = () => {
    onClose()
    setEditableElement(editableInitState)
  }

  const saveNewBrand = (_id: number | undefined | null = null, body) => {
    dispatch(addModel(body))
  }

  const saveEditParent = (id, body) => {
    dispatch(editModel({ id, body }))
  }

  const saveEditCarModel = async () => {
    const formData = new FormData()
    if (editableElement.newImg) {
      const blob = await fetch(editableElement.newImg).then((res) => res.blob())
      formData.append('img', blob)
    }

    formData.append('title', editableElement?.title)
    formData.append('model', editableElement?.model)
    formData.append('brandId', editableElement?.brandId)
    formData.append('releaseDate', editableElement.releaseDate)
    if (editableElement?.id) {
      dispatch(editModel({ id: editableElement.id, body: formData }))
    } else {
      dispatch(addModel(formData))
    }
    closeClickHandler()
  }

  const deleteHandler = (id) => {
    dispatch(deleteModel(id))
  }

  return (
    <Box>
      <Box className="flex items-center justify-between">
        <Text fontSize="xl">Марки машин</Text>
      </Box>
      <Accordion className="mt-5" allowMultiple={true}>
        {items &&
          items.map((item, index) => (
            <AccordionItem key={`${item.id}_${index}`}>
              <ListItemRow
                deleteHandler={deleteHandler}
                id={item.id}
                saveHandler={item.id < 0 ? saveNewBrand : saveEditParent}
                title={item.title}
                isParent={true}
              />
              <AccordionPanel>
                {!!item?.brandModels?.length &&
                  item.brandModels.map((element, index) => (
                    <ListItemRow
                      item={element}
                      key={`${element.id}_${index}`}
                      deleteHandler={deleteHandler}
                      saveHandler={saveNewBrand}
                      id={element.id ?? -1}
                      title={element.title}
                      parentCategoryId={item.id}
                      editHandlerModal={editClickHandler}
                      isEditModal
                    />
                  ))}
                <Box textAlign="right">
                  <Button
                    color="gray.600"
                    className="mr-4"
                    variant={'ghost'}
                    onClick={editClickHandler(undefined, item.id)}
                    disabled={!item.title}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
      <Box className="text-right p-4">
        <Button onClick={() => dispatch(addBrand())}>Добавить</Button>
      </Box>
      <Modal isOpen={isOpen} onClose={closeClickHandler} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить модель</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Название</Text>
            <Input
              value={editableElement.title}
              onChange={(e) => changeModalState('title', e.target.value)}
            />
            <Text>Модель</Text>

            <Input
              className="mt-2"
              value={editableElement.model}
              onChange={(e) => changeModalState('model', e.target.value)}
            />

            <Text>Дата производства</Text>

            <Input
              className="mt-2"
              value={editableElement.releaseDate}
              onChange={(e) => changeModalState('releaseDate', e.target.value)}
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
                onChange={(e) => changeModalState('newImg', e.target.files ?? '')}
              />
            </Box>
            <Box className="mt-2 flex justify-center">
              <img
                className="max-w-full"
                src={
                  editableElement.newImg
                    ? editableElement.newImg
                    : editableElement.img
                    ? editableElement.img
                    : ''
                }
                alt=""
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={closeClickHandler}>
              Отмена
            </Button>
            <Button colorScheme="blue" onClick={saveEditCarModel}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ManageCarModel
