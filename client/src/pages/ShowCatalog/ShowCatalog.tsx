import {
  Box,
  Container,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import Loader from 'components/Loader/Loader'
import { BreadCrumbsTitles } from 'constants/'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addBasketItem } from 'store/basket/basket.action'
import { fetchDetails } from 'store/detail/detail.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { IBasketItem } from 'types/basket.types'
import CatalogItem from './components/CatalogItem'
import CatalogItemSkeleton from './components/CatalogItemSkeleton'
import CatalogPagination from './components/CatalogPagination'
import CatalogSortSelect from './components/CatalogSortSelect'

const ShowCatalog = () => {
  const navigate = useNavigate()
  const { items: details, error, loading } = useAppSelector((state) => state.detail)
  const dispatch = useDispatch()
  const toast = useToast({
    duration: 1000,
    isClosable: true,
    status: 'success',
  })
  const addToBasketHandler = async (data: IBasketItem) => {
    try {
      // @ts-expect-error
      await dispatch(addBasketItem(data)).unwrap()
      toast({
        title: 'Успешно добавлено',
      })
    } catch (error) {
      toast({
        title: 'Произошла ошибка. Попробуйте еще раз',
        duration: 3000,
        status: 'error',
      })
    }
  }
  return (
    <Container maxW={'container.xl'}>
      <Breadcrumbs
        items={[
          {
            title: BreadCrumbsTitles.MODEL,
            options: {
              onClick: () => navigate(-2),
            },
          },
          {
            title: BreadCrumbsTitles.CATEGORY,
            options: {
              onClick: () => navigate(-1),
            },
          },
          {
            title: BreadCrumbsTitles.LIST,
          },
        ]}
      />

      <Text className="mt-2" fontWeight={'medium'} fontSize={'xl'}>
        Список запчастей
      </Text>
      <CatalogSortSelect />
      <Box className="grid grid-cols-5 gap-10 ">
        {loading && (
          <Box className="text-center flex justify-center w-full">
            <Spinner width="150px" height="150px" color="blue.500" speed="0.8s" marginTop="10vh" />
          </Box>
        )}
        {details &&
          !loading &&
          details.map((item) => <CatalogItem item={item} basketHandler={addToBasketHandler} />)}
      </Box>
      <CatalogPagination />
    </Container>
  )
}

export default ShowCatalog
