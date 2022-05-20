import { Box, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { ICategoryItem } from 'types/category.types'

interface ICatalogMenuItemProps {
  item: ICategoryItem
  clickHandler: (categoryId: number) => () => void
}

const CatalogMenuItem: React.FC<ICatalogMenuItemProps> = ({ item, clickHandler }) => {
  return (
    <>
      <MenuItem className="group" closeOnSelect={false}>
        <Text>{item.title}</Text>
        <Box
          as={MenuList}
          className={` p-4 absolute hidden  group-hover:flex  gap-5 flex-wrap cursor-default gap-x-12 shadow-lg`}
          style={{ display: 'none', left: '13.9rem', top: '-1px', width: '65vw' }}
        >
          {item.childCategories &&
            item.childCategories.map((item, index) => (
              <Box
                onClick={clickHandler(item.id)}
                key={`${item.id}_${index}`}
                className="w-1/4  max-w-xs"
              >
                <Text className="hover:text-chakra-red-500 cursor-pointer">{item.title}</Text>
              </Box>
            ))}
        </Box>
      </MenuItem>
    </>
  )
}

export default CatalogMenuItem
