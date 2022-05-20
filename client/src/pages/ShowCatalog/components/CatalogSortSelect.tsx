import { Box, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDetails } from 'store/detail/detail.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'

const sortValues = {
  default: 'Умолчанию',
  asc: 'Увеличению цены',
  desc: 'Уменьшению цены',
}
type SortValues = 'default' | 'asc' | 'desc'

const CatalogSortSelect = () => {
  const [itemsSort, setItemsSort] = useState<SortValues>('default')
  const { categoryId, modelId } = useParams()
  const currentPage = useAppSelector((state) => state.detail.currentPage)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (categoryId || modelId) {
      const orderBy = itemsSort === 'default' ? undefined : itemsSort
      dispatch(fetchDetails({ categoryId, modelId, page: currentPage, orderBy }))
    }
  }, [categoryId, modelId, dispatch, currentPage, itemsSort])

  return (
    <Box className="flex gap-2">
      Сортировать по:
      <Menu autoSelect={false}>
        <MenuButton as={Text} color={'blue.500'} textDecoration="underline" cursor={'pointer'}>
          {sortValues[itemsSort]}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setItemsSort('default')}>{sortValues['default']}</MenuItem>
          <MenuItem onClick={() => setItemsSort('asc')}>{sortValues['asc']}</MenuItem>
          <MenuItem onClick={() => setItemsSort('desc')}>{sortValues['desc']}</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default CatalogSortSelect
