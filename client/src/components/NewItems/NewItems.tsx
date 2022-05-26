import { Container, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import 'swiper/css'
import SliderItems from 'components/SliderItems/SliderItems'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchNewDetails } from 'store/detail/detail.action'

const NewItems = () => {
  const items = useAppSelector((state) => state.detail.newItems)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchNewDetails())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className='mt-10' maxW={'container.xl'}>
      <Text fontSize="1xl" fontWeight="bold">
        Новинки
      </Text>
      <SliderItems items={items} />
    </Container>
  )
}   

export default NewItems
