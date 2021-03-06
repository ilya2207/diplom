import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  Text,
  MenuItem,
  Box,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { useCustomToast } from 'hooks/useCustomToast'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchCategoryItems } from 'store/catalog/category.action'
import { setError } from 'store/catalog/category.slice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import CatalogMenuItem from './components/CatalogMenuItem/CatalogMenuItem'

const CatalogMenu = () => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.category)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategoryItems)
  }, [])

  const selectCategoryHandler = (categoryId: number) => () => {
    navigate(`category/${categoryId}`)
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Button} colorScheme="red" className="shrink-0">
        <div className="flex items-center gap-1">
          <HamburgerIcon />
          <Text fontSize={'lg'}>Каталог</Text>
          <ChevronDownIcon />
        </div>
      </MenuButton>
      <MenuList className="relative shadow-lg" flexDirection={'column'}>
        {!!items.length &&
          items.map((item, index) => (
            <CatalogMenuItem
              clickHandler={selectCategoryHandler}
              key={`${item.id}_${index}`}
              item={item}
            />
          ))}
      </MenuList>
    </Menu>
  )
}

export default CatalogMenu
