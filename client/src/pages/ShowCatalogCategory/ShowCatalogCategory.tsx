import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import React from 'react'
import ShowItems from 'components/ShowItems/ShowItems'
import { Container, Text } from '@chakra-ui/react'

const ShowCatalog = () => {
  return (
    <Container maxW={'container.xl'}>
      <Breadcrumbs
        items={[
          {
            title: 'Cписок запчастей',
          },
        ]}
      />
      <Text className="mt-2" fontSize={'xl'} fontWeight="medium">
        Список запчастей
      </Text>
      <ShowItems />
    </Container>
  )
}

export default ShowCatalog
