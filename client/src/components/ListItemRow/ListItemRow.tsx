import { AccordionButton, AccordionIcon, Box, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { ICategoryItem, ICategoryItemAdd } from 'types/category.types'

interface Props {
  title: string
  id: number
  parentCategoryId?: number
  isParent?: boolean
  saveHandler: (id: number | null, body: ICategoryItem | ICategoryItemAdd) => void
  deleteHandler: (id: number) => void
}

const ListItemRow: React.FC<Props> = ({
  title,
  isParent = false,
  id,
  parentCategoryId,
  saveHandler,
  deleteHandler,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const isNew = useRef(false)
  const [textValue, setTextValue] = useState(title)

  useEffect(() => {
    if (title === '') {
      setIsEdit(true)
      isNew.current = true
    }
  }, [])

  const deleteClickHandler = (event) => {
    if (isParent) event.stopPropagation()
    if (id) return deleteHandler(id)
  }

  const editHandler = (event) => {
    if (isParent) event.stopPropagation()
    if (textValue === '') return
    setIsEdit(!isEdit)
  }

  const updateHandler = (event) => {
    if (isParent) event.stopPropagation()
    if (textValue === '') return
    setIsEdit(!isEdit)
    if (isNew.current) {
      if (isParent) {
        saveHandler(null, { title: textValue })
      } else {
        return saveHandler(null, { title: textValue, parentCategoryId })
      }
      return (isNew.current = false)
    }
    if (id !== -1) {
      return saveHandler(id, { title: textValue })
    }
  }

  if (isParent) {
    return (
      <AccordionButton justifyContent="space-between" cursor="pointer" as={'div'}>
        {isEdit && (
          <Input
            onKeyDown={(e) => {
              e.stopPropagation()
              console.log(e)
            }}
            required
            className="max-w-sm"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        {!isEdit && <Text className="py-2">{textValue}</Text>}
        <Box>
          {!isEdit && (
            <i
              className="cursor-pointer text-chakra-blue-500 fa-solid fa-pen p-1 "
              onClick={editHandler}
            ></i>
          )}
          {isEdit && (
            <i
              className="fa-solid fa-check p-1 text-chakra-green-400 ml-4"
              style={{ cursor: textValue === '' ? 'not-allowed' : 'pointer' }}
              onClick={updateHandler}
            ></i>
          )}
          <i
            className="cursor-pointer text-chakra-red-500 fa-solid fa-trash-can p-1 ml-4"
            onClick={deleteClickHandler}
          ></i>

          <AccordionIcon className="ml-2" />
        </Box>
      </AccordionButton>
    )
  }

  return (
    <Box className="p-3 flex justify-between items-center">
      {isEdit && (
        <Input
          className="max-w-sm"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      )}
      {!isEdit && <Text>{textValue}</Text>}
      <Box className="flex gap-4">
        {!isEdit && (
          <i
            className="cursor-pointer text-chakra-blue-500 fa-solid fa-pen p-1 "
            onClick={editHandler}
          ></i>
        )}
        {isEdit && (
          <i
            className="fa-solid fa-check p-1 text-chakra-green-400 ml-4"
            style={{ cursor: textValue === '' ? 'not-allowed' : 'pointer' }}
            onClick={updateHandler}
          ></i>
        )}
        <i
          className="cursor-pointer text-chakra-red-500 fa-solid fa-trash-can p-1"
          onClick={deleteClickHandler}
        ></i>
      </Box>
    </Box>
  )
}

export default ListItemRow
