import { Box, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { ICategoryItem } from 'types/category.types'

interface ICatalogMenuItemProps {
  item: ICategoryItem
}

const CatalogMenuItem: React.FC<ICatalogMenuItemProps> = ({ item }) => {
  return (
    <>
      <MenuItem className="group ">
        <Text>{item.title}</Text>
        <Box
          as={MenuList}
          className={` p-4 absolute hidden  group-hover:flex  gap-5 flex-wrap cursor-default gap-x-12`}
          style={{ display: 'none', left: '13.9rem', top: '-1px', width: '65vw' }}
        >
          {item.childCategories &&
            item.childCategories.map((item) => (
              <Box className="w-1/4  max-w-xs">
                <Text className="hover:text-chakra-red-500 cursor-pointer">{item.title}</Text>
              </Box>
            ))}
        </Box>
      </MenuItem>
    </>
  )
}

export default CatalogMenuItem
