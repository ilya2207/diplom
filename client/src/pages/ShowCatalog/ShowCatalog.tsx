import { Box, Container, Text } from '@chakra-ui/react'
import axios from 'axios'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { BreadCrumbsTitles } from 'constants/breadcrumbs'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDetails } from 'store/detail/detail.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'

const ShowCatalog = () => {
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

      <Box>{details && details.map((item) => item.title)}</Box>
    </Container>
  )
}

export default ShowCatalog
