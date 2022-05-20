import { useEffect, useRef } from 'react'
import { Button, Container, Flex, Text, useDisclosure, Modal } from '@chakra-ui/react'
import './Header.scss'
import { ModalType } from './HeaderTypes'
import AuthModal from './components/AuthModal/AuthModal'
import { useAppSelector } from 'store/hooks'
import ProfileMenu from './components/ProfileMenu/ProfileMenu'
import { Link } from 'react-router-dom'
import { useCustomToast } from 'hooks/useCustomToast'
import { userSlice } from 'store/user/user.slice'
import { selectUserState } from 'store/user/user.selector'
import CatalogMenu from './components/CatalogMenu/CatalogMenu'
import HeaderSearch from './components/HeaderSearch/HeaderSearch'

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
    // <eslint-disable-next-line></eslint-disable-next-line> react-hooks/exhaustive-deps
  }, [error, loading])

  return (
    <div className="header w-full flex  items-center shadow-md py-4 sticky top-0 left-0 bg-white z-30">
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
        <Flex
          align={'center'}
          justify="space-between"
          className="mt-3 gap-10 lowTablet:flex-wrap lowTablet:gap-0"
        >
          <CatalogMenu />
          <HeaderSearch />
          {isAuth && (
            <Link to={'/basket'}>
              <Button size={'md'} className="shrink-0">
                <i className="fa-solid fa-cart-shopping  text-chakra-blue-500"></i>
              </Button>
            </Link>
          )}
        </Flex>
      </Container>
      <Modal isOpen={isOpen && !isAuth} onClose={onClose} isCentered>
        <AuthModal onClose={onClose} type={modalType.current} />
      </Modal>
    </div>
  )
}

export default Header
