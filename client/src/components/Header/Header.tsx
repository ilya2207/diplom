import React, { useEffect, useRef } from 'react'
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
  useToast,
  Modal,
} from '@chakra-ui/react'
import './Header.scss'
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { ModalType } from './HeaderTypes'
import AuthModal from './components/AuthModal/AuthModal'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import ProfileMenu from './components/ProfileMenu/ProfileMenu'
import { Link } from 'react-router-dom'
import { fetchUserData } from 'store/user/user.action'
import { useCustomToast } from 'hooks/useCustomToast'
import { userSlice } from 'store/user/user.slice'
import { selectUserState } from 'store/user/user.selector'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modalType = useRef<ModalType>('')
  const { user, loading, isAuth, error } = useAppSelector(selectUserState)
  const profileName = isAuth ? `${user.secondname} ${user.firstname}` : ''

  const toast = useCustomToast(userSlice.actions.setError(''))

  const modalOpenHandler = (type: 'signup' | 'login') => () => {
    modalType.current = type
    return onOpen()
  }

  useEffect(() => {
    if (error && !loading) {
      toast({
        title: error,
        duration: 3000,
        status: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading])

  return (
    <div className="header w-full flex  items-center shadow-md py-4">
      <Container maxW={'container.xl'}>
        <Flex justify={'space-between'} align="center" className="gap-10">
          <Link to={'/'}>
            <Text fontSize="3xl">АвтоЗапчасти</Text>
          </Link>

          <div className="flex gap-2">
            {!isAuth && (
              <>
                <Button onClick={modalOpenHandler('signup')}>Регистрация</Button>
                <Button size={'md'} colorScheme={'blue'} onClick={modalOpenHandler('login')}>
                  <i className="fa-solid fa-user mr-2"></i>
                  Вход
                </Button>
              </>
            )}
            {isAuth && <ProfileMenu profileName={profileName} />}
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
            <InputRightElement className="z-0" pointerEvents="none" children={<SearchIcon />} />
            <Input type="tel" placeholder="Введите артикул или наименование запчасти" />
          </InputGroup>
          <Button size={'md'} className="shrink-0">
            <i className="fa-solid fa-cart-shopping  text-chakra-blue-500"></i>
          </Button>
        </Flex>
      </Container>
      <Modal isOpen={isOpen && !isAuth} onClose={onClose} isCentered>
        <AuthModal onClose={onClose} type={modalType.current} />
      </Modal>
    </div>
  )
}

export default Header
