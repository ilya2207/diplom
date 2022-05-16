import { Box, Menu, MenuButton, MenuList, MenuItem, Text, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDetails } from 'store/detail/detail.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'

const sortValues = {
  default: 'Умолчанию',
  asc: 'Увеличению цены',
  desc: 'Уменьшению цены',
}

const CatalogSortSelect = () => {
  const [itemsSort, setItemsSort] = useState('default')
  const { categoryId, modelId } = useParams()
  const currentPage = useAppSelector((state) => state.detail.currentPage)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (categoryId || modelId) {
      dispatch(fetchDetails({ categoryId, modelId, page: currentPage }))
    }
  }, [categoryId, modelId, dispatch, currentPage])

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
          <MenuItem onClick={() => setItemsSort('desc')}>{sortValues['default']}</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default CatalogSortSelect
