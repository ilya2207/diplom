import { Box, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const CatalogSortSelect = () => {
  const [itemsSort, setItemsSort] = useState('Умолчанию')
  return (
    <Box className="flex gap-2">
      Сортировать по:
      <Menu>
        <MenuButton as={Text} color={'blue.500'} textDecoration="underline" cursor={'pointer'}>
          {itemsSort}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setItemsSort('Умолчанию')}>Умолчанию</MenuItem>
          <MenuItem onClick={() => setItemsSort('Увеличению цены')}>Увеличению цены</MenuItem>
          <MenuItem onClick={() => setItemsSort('Уменьшению цены')}>Уменьшению цены</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default CatalogSortSelect
