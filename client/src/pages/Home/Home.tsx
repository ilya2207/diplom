import { Container } from '@chakra-ui/react'
import CarModelCatalog from 'components/CarModelCatalog/CarModelCatalog'
import NewItems from 'components/NewItems/NewItems'
import PopularItems from 'components/PopularItems/PopularItems'
import React from 'react'

const Home = () => {
  return (
    <Container maxW={'container.xl'}>
      <PopularItems />
      <NewItems />
      <CarModelCatalog />
    </Container>
  )
}

export default Home
