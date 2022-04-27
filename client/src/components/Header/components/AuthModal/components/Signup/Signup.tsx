import { EmailIcon, PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Input, InputRightElement } from '@chakra-ui/react'
import { IModalBodyContent } from 'components/Header/HeaderTypes'
import React from 'react'

const Signup: React.FC<IModalBodyContent> = ({
  passwordType,
  passwordVisibleHandler,
  register,
}) => {
  return (
    <div className="anim__right">
      <InputGroup className="mt-4">
        <Input placeholder="Фамилия" {...register('secondname', { required: true })} />
      </InputGroup>
      <InputGroup className="mt-4">
        <Input placeholder="Имя" {...register('firstname', { required: true })} />
      </InputGroup>
      <InputGroup className="mt-4">
        <Input placeholder="Отчество" {...register('lastname', { required: true })} />
      </InputGroup>
      <InputGroup className="mt-4">
        <InputRightElement pointerEvents="none" children={<PhoneIcon />} />
        <Input placeholder="Номер телефона" {...register('phone', { required: true })} />
      </InputGroup>
      <InputGroup className="mt-4">
        <InputRightElement pointerEvents="none" children={<EmailIcon />} />
        <Input placeholder="Почтовый ящик" {...register('email', { required: true })} />
      </InputGroup>
      <InputGroup className="mt-4">
        <InputRightElement
          className="cursor-pointer"
          children={passwordType === 'password' ? <ViewIcon /> : <ViewOffIcon />}
          onClick={passwordVisibleHandler}
        />
        <Input
          type={passwordType}
          placeholder="Пароль"
          {...register('password', { required: true })}
        />
      </InputGroup>
    </div>
  )
}

export default Signup
