import { Box, Button, FormLabel, Input, Spinner } from '@chakra-ui/react'
import useDebounce from 'hooks/useDebounce'
import React, { useEffect, useRef, useState } from 'react'
import { searchAdminValues } from 'store/admin/admin.action'
import { resetValues } from 'store/admin/admin.slice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { ICategoryItem } from 'types/category.types'
import { IModel } from 'types/model.types'
import { IRelations } from './AddDetail'

interface Props {
  title: string
  items: IModel[] | ICategoryItem[] | undefined
  itemsKey: keyof IRelations
  addRelation: (type: keyof IRelations, item: IModel | ICategoryItem[]) => void
  deleteRelation: (type: keyof IRelations, itemId: number) => void
}

const SelectDetailRelations: React.FC<Props> = ({
  itemsKey,
  title,
  items: selectedItems,
  addRelation,
  deleteRelation,
}) => {
  const [focus, setFocus] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const items = useAppSelector((state) => state.admin[itemsKey])
  const wrapperRef = useRef(null)
  const debouncedInputValue = useDebounce(input, 350)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (debouncedInputValue !== '') {
          setLoading(true)
          await dispatch(searchAdminValues({ searchStr: debouncedInputValue, type: itemsKey }))
        }
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, itemsKey])

  useEffect(() => {
    const clickHandler = (e) => {
      if (!e.path.includes(wrapperRef.current)) {
        setFocus(false)
      }
    }

    window.addEventListener('click', clickHandler)

    return () => {
      dispatch(resetValues())
      window.removeEventListener('click', clickHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Box ref={wrapperRef}>
      <FormLabel>{title}</FormLabel>
      <Box className="relative">
        {selectedItems &&
          selectedItems.map((item: IModel | ICategoryItem, index) => (
            <Button
              key={`${item.id}_${index}`}
              className="flex items-center mt-2 justify-between cursor-pointer"
              fontWeight={'normal'}
              as={Box}
              variant={'ghost'}
              onClick={() => deleteRelation(itemsKey, item.id)}
            >
              {item.title}
              <i className="fa-solid fa-xmark mt-1"></i>
            </Button>
          ))}
        <Input
          className="mt-4"
          onFocus={() => setFocus(true)}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {focus && !loading && (
          <Box className="mt-2">
            {items &&
              items.map((item: IModel | ICategoryItem, index: number) => {
                // @ts-expect-error
                const isItemExists = selectedItems!.find(
                  (selectedItem) => selectedItem.id === item.id
                )

                return (
                  <Button
                    onClick={() => addRelation(itemsKey, item)}
                    disabled={!!isItemExists}
                    className="mt-2 p-2 cursor-pointer flex justify-between items-center w-full"
                    key={`${item.id}_${index}`}
                  >
                    {item.title}
                    <i className="fa-solid fa-circle-plus"></i>
                  </Button>
                )
              })}
          </Box>
        )}
        {loading && (
          <Box className="text-center">
            <Spinner width="75px" height="75px" color="blue.500" speed="0.8s" marginTop="20px" />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SelectDetailRelations
