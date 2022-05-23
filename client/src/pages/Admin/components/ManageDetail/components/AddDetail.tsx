import { Box, Button, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IDetail } from 'types/detail.types'
import { IManageDetailCondition } from '../ManageDetail'

interface Props {
  changeCondition: (state: IManageDetailCondition) => void
}

interface IFormState extends Omit<IDetail, 'id' | 'img'> {
  img: null | File
}

const AddDetail: React.FC<Props> = ({ changeCondition }) => {
  const [file, setFile] = useState<null | string>(null)
  const { register, handleSubmit } = useForm<IFormState>({
    defaultValues: {
      shortDescription: '',

      title: '',
      vendorCode: '',
      img: null,
    },
  })
  const uploadFile = (e) => {
    const url = URL.createObjectURL(e.target.files[0])
    setFile(url)
  }

  const submitHandler = (values: IFormState) => {
    console.log(values)
  }

  const backClickHandler = () => {
    changeCondition({ isMain: true, selectedItem: null })
  }

  return (
    <Box>
      <Text className="text-chakra-blue-500 cursor-pointer" onClick={backClickHandler}>
        Назад
      </Text>
      <Box>
        <Text fontSize={'xl'}>Добавление детали</Text>
      </Box>
      <Box>
        <FormLabel>Название</FormLabel>
        <Input
          {...register('title', {
            required: true,
          })}
        />
      </Box>
      <Box>
        <FormLabel>Короткое описание</FormLabel>
        <Input
          {...register('shortDescription', {
            required: true,
          })}
        />
      </Box>
      <Box>
        <FormLabel>Стоимость</FormLabel>
        <Input
          {...register('price', {
            required: true,
          })}
          type="number"
        />
      </Box>
      <Box>
        <FormLabel>Артикул</FormLabel>
        <Input
          {...register('vendorCode', {
            required: true,
          })}
        />
      </Box>
      <Box>
        <Text className="mt-2">Изображение</Text>
        <label
          className="cursor-pointer mt-3 p-4 flex justify-center items-center border-2 border-dashed"
          htmlFor="uploadFile"
        >
          Выберите изображение
        </label>
        <input
          onChange={uploadFile}
          name="img"
          className="overflow-hidden w-0 h-0 opacity-0 absolute"
          type="file"
          id="uploadFile"
        />
        {file && (
          <Box className="flex justify-center mt-4">
            <img src={file} alt="" />
          </Box>
        )}
      </Box>
      <Box className="flex gap-4 mt-8 justify-center">
        <Button>Отмена</Button>
        <Button colorScheme={'blue'}>Сохранить</Button>
      </Box>
    </Box>
  )
}

export default AddDetail
