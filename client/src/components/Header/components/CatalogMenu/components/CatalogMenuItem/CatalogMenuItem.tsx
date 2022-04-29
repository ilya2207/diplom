import { Box, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { ICategoryItem } from 'types/category.types'

interface ICatalogMenuItemProps {
  item: ICategoryItem
}

const CatalogMenuItem: React.FC<ICatalogMenuItemProps> = ({ item }) => {
  return (
    <>
      <MenuItem className="group">
        <Text>{item.title}</Text>
        <Box
          as={MenuList}
          className={` p-4 absolute hidden  group-hover:flex h-96 w-full  gap-5 flex-wrap`}
          style={{ display: 'none', left: '13.9rem', top: '-1px' }}
        >
          {item.childCategories &&
            item.childCategories.map((item) => (
              <Box className="hover:text-chakra-red-500 w-1/3 h-1">
                <Text>{item.title}</Text>
              </Box>
            ))}
        </Box>
      </MenuItem>
    </>
  )
}

export default CatalogMenuItem
