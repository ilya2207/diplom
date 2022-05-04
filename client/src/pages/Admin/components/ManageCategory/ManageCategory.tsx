import { Accordion, Box, Button, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  addCategoryItem,
  deleteCategoryItem,
  fetchCategoryItems,
  updateCategoryItem,
} from 'store/catalog/category.action'
import { addNewCategory, deleteNewCategory } from 'store/catalog/category.slice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { ICategoryItem, ICategoryItemAdd, IUpdateCategoryItem } from 'types/category.types'
import CategoryListItem from './components/CategoryListItem/CategoryListItem'

const ManageCategory = () => {
  const categories = useAppSelector((state) => state.category)

  const { items } = categories
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (categories.items.length === 0) {
      dispatch(fetchCategoryItems())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addCategoryHandler = () => {
    dispatch(addNewCategory())
  }

  const addChildCategoryHandler = (id: number) => {
    dispatch(addNewCategory(id))
  }

  const saveCategoryHandler = (id: number | null, body: ICategoryItem | ICategoryItemAdd) => {
    if (id) {
      return dispatch(updateCategoryItem({ body, id } as IUpdateCategoryItem))
    }
    return dispatch(addCategoryItem(body))
  }

  const deleteCategoryHandler = (id: number) => {
    if (id > 0) return dispatch(deleteCategoryItem(id))
    return dispatch(deleteNewCategory(id))
  }

  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Text fontSize="xl">Категории запчастей</Text>
      </Box>
      <Accordion className="mt-5" allowMultiple>
        {!!items.length &&
          items.map((item, index) => (
            <CategoryListItem
              key={`${item?.id}_${index}`}
              item={item}
              saveHandler={saveCategoryHandler}
              deleteHandler={deleteCategoryHandler}
              addChildCategoryHandler={addChildCategoryHandler}
            />
          ))}
      </Accordion>
      <Box className="text-right p-4">
        <Button onClick={addCategoryHandler}>Добавить</Button>
      </Box>
    </Box>
  )
}

export default ManageCategory
