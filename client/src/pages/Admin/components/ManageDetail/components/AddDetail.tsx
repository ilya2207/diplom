import { Box, Button, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addDetail, editDetail } from 'store/detail/detail.action'
import { useAppDispatch } from 'store/hooks'
import { ICategoryItem } from 'types/category.types'
import { IDetail, IDetailWithDetailsAndCategories } from 'types/detail.types'
import { IModel } from 'types/model.types'
import { IManageDetailCondition } from '../ManageDetail'
import SelectDetailRelations from './SelectDetailRelations'

interface Props {
  changeCondition: (state: IManageDetailCondition) => void
  selectedItem: IDetailWithDetailsAndCategories | null
}

export interface IRelations {
  models: IModel[]
  categories: ICategoryItem[]
}
type IFormState = Omit<IDetail, 'id' | 'img'>

const AddDetail: React.FC<Props> = ({ changeCondition, selectedItem }) => {
  const [fileUrl, setFile] = useState<null | string>(selectedItem?.img ?? null)
  const { register, handleSubmit, reset } = useForm<IFormState>({
    defaultValues: {
      title: '',
      vendorCode: '',
    },
  })

  const dispatch = useAppDispatch()

  const toast = useToast({
    duration: 3000,
    status: 'success',
  })

  const [relations, setRelations] = useState<IRelations>({
    models: selectedItem?.models ? [...selectedItem?.models] : [],
    categories: selectedItem?.categories ? [...selectedItem?.categories] : [],
  })

  useEffect(() => {
    if (selectedItem) {
      const { id, img, categories, models, ...body } = selectedItem
      reset(body)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const uploadFile = (e) => {
    const url = URL.createObjectURL(e.target.files[0])
    setFile(url)
  }

  const submitHandler = async (values: IFormState) => {
    const formData = new FormData()
    const allValues = { ...values, ...relations }

    if (fileUrl) {
      const blob = await fetch(fileUrl).then((res) => res.blob())
      formData.append('img', blob)
    }
    Object.entries(allValues).forEach((item) => {
      const [key, value] = item
      if (key === 'id') return
      if (Array.isArray(value)) return formData.append(key, JSON.stringify(value))
      return formData.append(key, value.toString())
    })
    try {
      if (selectedItem) {
        const arg = {
          data: formData,
          id: selectedItem.id,
        }
        await dispatch(editDetail(arg))
      } else {
        await dispatch(addDetail(formData))
      }
      toast({
        title: selectedItem ? '?????????????? ??????????????????' : '?????????????? ??????????????????',
      })
      changeCondition({
        isMain: true,
        selectedItem: null,
      })
    } catch (error) {
      toast({
        title: '??????-???? ?????????? ???? ??????',
        status: 'error',
      })
    }
  }

  const backClickHandler = () => {
    changeCondition({ isMain: true, selectedItem: null })
  }

  const addRelation = <T extends {}>(type: keyof IRelations, item: T) => {
    setRelations((prevValue) => {
      const newValues = [...prevValue[type], item]
      return { ...prevValue, [type]: newValues }
    })
  }
  const deleteRelation = (type: keyof IRelations, itemId: number) => {

    setRelations((prevValue) => {
      const newValues = [...prevValue[type]].filter((item) => itemId !== item.id)
      return { ...prevValue, [type]: newValues }
    })
  }
  return (
    <Box>
      <Box>
        <Text className="text-chakra-blue-500 cursor-pointer" onClick={backClickHandler}>
          ??????????
        </Text>
      </Box>
      <Box>
        <Text fontSize={'xl'}>{selectedItem ? '??????????????????' : '????????????????????'} ????????????</Text>
      </Box>
      <Box className="mt-4">
        <FormLabel>????????????????</FormLabel>
        <Input
          {...register('title', {
            required: true,
          })}
        />
      </Box>
      <Box>
        <FormLabel>??????????????????</FormLabel>
        <Input
          {...register('price', {
            required: true,
          })}
          type="number"
        />
      </Box>
      <Box>
        <FormLabel>??????????????</FormLabel>
        <Input
          {...register('vendorCode', {
            required: true,
          })}
        />
      </Box>
      <Box>
        <FormLabel>??????????????????????</FormLabel>
        <label
          className="cursor-pointer mt-3 p-4 flex justify-center items-center border-2 border-dashed"
          htmlFor="uploadFile"
        >
          ???????????????? ??????????????????????
        </label>
        <input
          onChange={uploadFile}
          name="img"
          className="overflow-hidden w-0 h-0 opacity-0 absolute"
          type="file"
          id="uploadFile"
        />
        {fileUrl && (
          <Box className="flex justify-center mt-4 max-w-[250px] mx-auto">
            <img src={fileUrl} alt="" />
          </Box>
        )}
      </Box>
      <Box className="mt-4">
        <SelectDetailRelations
          itemsKey="categories"
          title="??????????????????"
          addRelation={addRelation}
          deleteRelation={deleteRelation}
          items={relations.categories}
        />
      </Box>
      <Box className="mt-4">
        <SelectDetailRelations
          itemsKey="models"
          title="????????????"
          addRelation={addRelation}
          deleteRelation={deleteRelation}
          items={relations.models}
        />
      </Box>
      <Box className="flex gap-4 mt-8 justify-center">
        <Button onClick={backClickHandler}>????????????</Button>
        <Button colorScheme={'blue'} onClick={handleSubmit(submitHandler)}>
          ??????????????????
        </Button>
      </Box>
    </Box>
  )
}

export default AddDetail
