import { Container, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import 'swiper/css'
import SliderItems from 'components/SliderItems/SliderItems'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchPopularDetails } from 'store/detail/detail.action'

const PopularItems = () => {
  const items = useAppSelector((state) => state.detail.popularItems)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPopularDetails())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])    

  return (
    <Container className='mt-10' maxW={'container.xl'}>
      <Text fontSize="1xl" fontWeight="bold">
        Популярное
      </Text>
      <SliderItems items={items} />
    </Container>
  )
}

export default PopularItems
