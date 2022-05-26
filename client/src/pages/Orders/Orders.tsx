import { Box, Container, Text } from '@chakra-ui/react'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchOrders } from 'store/order/order.action'
import OrderItem from './OrderItem'

const Orders = () => {
  const { orders } = useAppSelector((state) => state.order)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <Container maxW={'container.xl'}>
      <Breadcrumbs
        items={[
          {
            title: 'Заказы',
          },
        ]}
      />
      <Text className="mt-2" fontWeight={'medium'} fontSize={'xl'}>
        Заказы
      </Text>
      <Box className="flex items-center gap-3 flex-col justify-center">
        {orders &&
          orders.map((item, index) => <OrderItem key={`${item.id}_${index}`} item={item} />)}
      </Box>
    </Container>
  )
}

export default Orders
