import { PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Input, InputRightElement } from '@chakra-ui/react'
import { IModalBodyContent } from 'components/Header/HeaderTypes'
import React from 'react'

const Login: React.FC<IModalBodyContent> = ({ passwordType, passwordVisibleHandler, register }) => {
  return (
    <div className="anim__left">
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<PhoneIcon />} />
        <Input placeholder="Введите номер телефона" {...register('phone', { required: true })} />
      </InputGroup>
      <InputGroup className="mt-4">
        <InputRightElement
          className="cursor-pointer"
          children={passwordType === 'password' ? <ViewIcon /> : <ViewOffIcon />}
          onClick={passwordVisibleHandler}
        />
        <Input
          type={passwordType}
          placeholder="Введите пароль"
          {...register('password', { required: true })}
        />
      </InputGroup>
    </div>
  )
}

export default Login
