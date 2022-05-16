import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import React from 'react'
import ShowItems from 'components/ShowItems/ShowItems'
import { BreadCrumbsTitles } from 'constants/'
import { useNavigate } from 'react-router-dom'
import { Container, Text } from '@chakra-ui/react'

const ShowCatalog = () => {
  const navigate = useNavigate()

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
      <Text className='mt-2' fontSize={'xl'} fontWeight="medium">
        Список запчтастей
      </Text>
      <ShowItems />
    </Container>
  )
}

export default ShowCatalog
