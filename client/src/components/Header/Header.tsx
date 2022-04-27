import React, { useRef } from 'react'
import {
  Button,
  Container,
  Flex,
  Input,
  Menu,
  MenuButton,
  Text,
  MenuList,
  InputRightElement,
  InputGroup,
  useDisclosure,
} from '@chakra-ui/react'
import './Header.scss'
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { ModalType } from './HeaderTypes'
import AuthModal from './components/AuthModal/AuthModal'
import { useAppSelector } from 'store/hooks'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modalType = useRef<ModalType>('')
  const accessToken = useAppSelector((state) => state.user.accessToken)

  const modalOpenHandler = (type: 'signup' | 'login') => () => {
    console.log(accessToken)

    if (accessToken === '') {
      modalType.current = type
      return onOpen()
    }
    console.log('Я авторизован')
  }
  return (
    <div className="header w-full flex  items-center shadow-md py-4">
      <Container maxW={'container.xl'}>
        <Flex justify={'space-between'} align="center" className="gap-10">
          <Text fontSize="2xl">АвтоЗапчасти</Text>

          <div className="flex gap-2">
            <Button onClick={modalOpenHandler('signup')}>Регистрация</Button>
            <Button size={'md'} colorScheme={'blue'} onClick={modalOpenHandler('login')}>
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
            <i className="fa-solid fa-cart-shopping  text-chakra-blue-500"></i>
          </Button>
        </Flex>
      </Container>

      <AuthModal isOpen={isOpen} onClose={onClose} type={modalType.current} />
    </div>
  )
}

export default Header
