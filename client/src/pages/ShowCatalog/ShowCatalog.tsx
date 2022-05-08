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
} from '@chakra-ui/react'
import axios from 'axios'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import Loader from 'components/Loader/Loader'
import { BreadCrumbsTitles } from 'constants/breadcrumbs'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDetails } from 'store/detail/detail.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import CatalogItem from './components/CatalogItem'
import CatalogItemSkeleton from './components/CatalogItemSkeleton'
import CatalogSortSelect from './components/CatalogSortSelect'

const ShowCatalog = () => {
  const [pagination, setPagination] = useState(8)
  const { categoryId, modelId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items: details, error, loading } = useAppSelector((state) => state.detail)

  useEffect(() => {
    dispatch(fetchDetails({ categoryId, modelId }))
  }, [])

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
      <Box className="flex justify-between mt-4 flex-wrap gap-3 gap-y-10">
        {loading && (
          <Box className="text-center flex justify-center w-full">
            <Spinner
              size={'xl'}
              width="150px"
              height="150px"
              color="blue.500"
              speed="0.8s"
              marginTop="10vh"
            />
            {/* <Loader /> */}
          </Box>
        )}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
        {details && !loading && details.map((item) => <CatalogItem item={item} />)}
      </Box>
    </Container>
  )
}

export default ShowCatalog
