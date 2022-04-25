import React from 'react'
import {
  Button,
  Container,
  Flex,
  Input,
  Menu,
  MenuButton,
  Text,
  MenuList,
  MenuItem,
  InputRightElement,
  InputGroup,
  MenuOptionGroup,
} from '@chakra-ui/react'
import './Header.scss'
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons'

const Header = () => {
  return (
    <div className="header w-full flex  items-center shadow-md py-4">
      <Container maxW={'container.xl'}>
        <Flex justify={'space-between'} align="center" className="gap-10">
          <Text fontSize="2xl">АвтоЗапчасти</Text>

          <div className="flex gap-2">
            <Button>Регистрация</Button>
            <Button size={'md'} colorScheme={'blue'}>
              <i className="fa-solid fa-user mr-2"></i>
              Вход
            </Button>
          </div>
        </Flex>
        <Flex align={'center'} justify="space-between" className="mt-3 gap-10">
          <Menu>
            <MenuButton as={Button} colorScheme="red" className="shrink-0">
              <div className="flex items-center gap-1">
                <HamburgerIcon />
                <Text fontSize={'lg'}>Каталог</Text>
                <ChevronDownIcon />
              </div>
            </MenuButton>
            <MenuList className="flex"></MenuList>
          </Menu>
          <InputGroup>
            <InputRightElement pointerEvents="none" children={<SearchIcon />} />
            <Input type="tel" placeholder="Введите артикул или наименование запчасти" />
          </InputGroup>
          <Button size={'md'} className="shrink-0">
            <i className="fa-solid fa-cart-shopping mr-2 text-chakra-blue-500"></i>
            Корзина
          </Button>
        </Flex>
      </Container>
    </div>
  )
}

export default Header
