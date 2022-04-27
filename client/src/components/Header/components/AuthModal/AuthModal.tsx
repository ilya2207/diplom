import { PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react'
import { ModalType } from 'components/Header/HeaderTypes'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store/hooks'
import { useGetUserQuery, useLoginMutation, useSignupMutation } from 'store/services/auth'
import { userSlice } from 'store/slices/userSlice'
import { MutationResposnse } from 'types/types'
import { ISignupUser, IUser } from 'types/user.types'
import styles from './AuthModal.module.scss'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

interface AuthModalProps {
  isOpen: boolean
  type: ModalType
  onClose: () => void
}

export interface IAuthModalLoginForm {
  phone: string
  password: string
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type }) => {
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password')
  const [modalType, setModalType] = useState<ModalType>('')
  const { register, handleSubmit, reset } = useForm<IAuthModalLoginForm | ISignupUser>()
  const [loginMutation, { isLoading: loadingLogin, error: errorLogin, isError: isErrorLogin }] =
    useLoginMutation()
  const [signupMutation, { isLoading: loadingSignup, error: errorSignup, isError: isErrorSignup }] =
    useSignupMutation()
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoading = loadingLogin || loadingSignup

  useEffect(() => {
    setModalType(type)
  }, [type])

  const setPasswordVisibleHandler = () => {
    const type = passwordType === 'password' ? 'text' : 'password'
    setPasswordType(type)
  }

  const changeTypeHandler = () => {
    const type: ModalType = modalType === 'login' ? 'signup' : 'login'
    setModalType(type)
    reset()
  }

  const closeHandler = () => {
    onClose()
    return reset()
  }
  // TODO Понять как тут сделать правильный тип даты
  const submitHandler = async (data) => {
    let res: any
    if (modalType === 'login') {
      res = await loginMutation(data)
    } else {
      res = await signupMutation(data)
    }
    if (res?.data) {
      dispatch(userSlice.actions.setUser(res.data))
      closeHandler()
      navigate('/profile')
    } else {
      toast({
        title: res?.error.data?.message,
        status: 'error',
        duration: 2000,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={closeHandler} isCentered>
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
          {/* {error && 'status' in error && (
            <Text color={'red.400'}>
              {error.status === 500
                ? 'Произошла ошибка, попробуйте позже'
                : 'Данные введены некорректно'}
            </Text>
          )} */}
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
          <Button colorScheme="blue" onClick={handleSubmit(submitHandler)} isLoading={isLoading}>
            Войти
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AuthModal
