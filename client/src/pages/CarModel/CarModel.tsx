import { Box, Container, Text } from '@chakra-ui/react'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import CarModelItem from './components/CarModelItem'
const CarModel = () => {
  const { carId } = useParams()

  const { pathname } = useLocation()
  const car = useAppSelector((state) => {
    if (carId) {
      return state.model.items.find((item) => item.id === +carId)
    }

    return null
  })

  return (
    <Container maxW={'container.xl'}>
      <Breadcrumbs items={[{ title: 'Модель авто' }]} />
      <Text marginTop={2} fontWeight={'medium'} fontSize={'xl'}>
        Выберите модель авто
      </Text>
      <Box className="flex flex-wrap gap-y-8 mt-6">
        {!!car?.brandModels?.length &&
          car.brandModels.map((item) => (
            <CarModelItem linkPath={pathname} key={item.id} item={item} />
          ))}
        {car?.brandModels?.length === 0 && <Box>Модели это марки авто отсутствуют</Box>}
      </Box>
    </Container>
  )
}

export default CarModel
