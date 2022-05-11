import { Box, Button, Container, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { editProfile } from 'store/user/user.action'

interface IFormValues {
  firstname: string
  secondname: string
  lastname: string
  email: string
  phone: string
  newPassword?: string
  oldPassword?: string
  confirmPassword?: string
}

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    reValidateMode: 'onChange',
  })
  const toast = useToast({
    isClosable: true,
    duration: 3000,
    status: 'error',
  })
  const user = useAppSelector((state) => state.user.user)
  useEffect(() => {
    const { accessToken, type, ...formUser } = user
    reset({ ...formUser })
  }, [user, reset])
  const dispatch = useAppDispatch()
  const sumbitHandler = async (values: IFormValues) => {
    const { confirmPassword, newPassword: password, oldPassword, ...userData } = values
    if (oldPassword && confirmPassword && password) {
      if (password !== confirmPassword)
        return toast({
          title: 'Пароли не совпадают',
        })
    }

    try {
      const response = await dispatch(editProfile({ ...userData, password, oldPassword })).unwrap()
      if (response.status === 200) {
        return toast({
          status: 'success',
          title: 'Успешно обновлено',
        })
      }
    } catch (response: any) {
      toast({
        title: response.data.message,
      })
    }
  }
  return (
    <Container maxWidth={'container.xl'}>
      <Text className="mt-2" fontWeight={'medium'} fontSize={'xl'}>
        Профиль
      </Text>
      <Container maxWidth={'container.sm'} className="mt-4">
        <Box className="mt-2">
          <FormLabel>Фамилия</FormLabel>
          <Input isInvalid={!!errors.secondname} {...register('secondname', { required: true })} />
        </Box>
        <Box className="mt-2">
          <FormLabel>Имя</FormLabel>
          <Input
            isInvalid={!!errors.firstname}
            required
            {...register('firstname', { required: true })}
          />
        </Box>

        <Box className="mt-2">
          <FormLabel>Отчество</FormLabel>
          <Input
            isInvalid={!!errors.lastname}
            required
            {...register('lastname', { required: true })}
          />
        </Box>

        <Box className="mt-2">
          <FormLabel>Почта</FormLabel>
          <Input isInvalid={!!errors.email} required {...register('email', { required: true })} />
        </Box>
        <Box className="mt-2">
          <FormLabel>Телефон</FormLabel>
          <Input isInvalid={!!errors.phone} required {...register('phone', { required: true })} />
        </Box>

        <Box className="mt-2">
          <FormLabel>Старый пароль</FormLabel>
          <Input type={'password'} {...register('oldPassword')} />
        </Box>
        <Box className="mt-2">
          <FormLabel>Новый пароль</FormLabel>
          <Input type={'password'} {...register('newPassword')} />
        </Box>
        <Box className="mt-2">
          <FormLabel>Подтверждение пароля</FormLabel>
          <Input type={'password'} {...register('confirmPassword')} />
        </Box>
        <Box className="text-right mt-6">
          <Button colorScheme={'blue'} onClick={handleSubmit(sumbitHandler)}>
            Сохранить
          </Button>
        </Box>
      </Container>
    </Container>
  )
}

export default Profile
