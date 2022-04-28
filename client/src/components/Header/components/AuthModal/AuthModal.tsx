import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { ModalType } from 'components/Header/HeaderTypes'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { loginUser, signupUser } from 'store/user/user.action'
import { ISignupUser } from 'types/user.types'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

interface AuthModalProps {
  type: ModalType
  onClose: () => void
}

export interface IAuthModalLoginForm {
  phone: string
  password: string
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, type }) => {
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password')
  const [modalType, setModalType] = useState<ModalType>('')
  const { register, handleSubmit, reset } = useForm<IAuthModalLoginForm | ISignupUser>()
  const { loading } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  console.log(1)

  useEffect(() => {
    setModalType(type)
  }, [type])

  const setPasswordVisibleHandler = () => {
    const type = passwordType === 'password' ? 'text' : 'password'
    setPasswordType(type)
  }

  const closeHandler = () => {
    onClose()
    return reset()
  }
  useEffect(() => {
    return () => closeHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeTypeHandler = () => {
    const type: ModalType = modalType === 'login' ? 'signup' : 'login'
    setModalType(type)
    reset()
  }

  const submitHandler = async (data) => {
    if (modalType === 'login') {
      dispatch(loginUser(data))
    } else {
      dispatch(signupUser(data))
    }
  }

  return (
    <>
      <ModalOverlay />
      <ModalContent className="overflow-hidden">
        <ModalHeader>{modalType === 'login' ? 'Авторизация' : 'Регистрация'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalType === 'login' && (
            <Login
              passwordType={passwordType}
              passwordVisibleHandler={setPasswordVisibleHandler}
              register={register}
            />
          )}
          {modalType === 'signup' && (
            <Signup
              passwordType={passwordType}
              passwordVisibleHandler={setPasswordVisibleHandler}
              register={register}
            />
          )}

          <div className="mt-3">
            {modalType === 'login' && (
              <Text>
                Нету аккаунта?
                <span
                  className="cursor-pointer text-chakra-blue-500 ml-1"
                  onClick={changeTypeHandler}
                >
                  Зарегистрироваться
                </span>
              </Text>
            )}
            {modalType === 'signup' && (
              <Text>
                Есть аккаунт?
                <span
                  className="cursor-pointer text-chakra-blue-500 ml-1"
                  onClick={changeTypeHandler}
                >
                  Войти
                </span>
              </Text>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={closeHandler}>
            Закрыть
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(submitHandler)} isLoading={loading}>
            {modalType === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default AuthModal
