import { Box, Button, Container, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  deleteAllBasketItems,
  deleteBasketItem,
  editBasketItem,
  fetchBasket,
} from 'store/basket/basket.action'
import { getBasketTotalAmount } from 'store/basket/basket.selector'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addOrder } from 'store/order/order.action'
import BasketItem from './BasketItem'

const Basket = () => {
  const dispatch = useAppDispatch()
  const { items, totalAmount } = useAppSelector((state) => ({
    items: state.basket.items,
    totalAmount: getBasketTotalAmount(state),
  }))

  useEffect(() => {
    dispatch(fetchBasket())
  }, [dispatch])

  const changeAmountHandler = (itemId: number, value: number) => {
    return dispatch(editBasketItem({ id: itemId, amount: value }))
  }

  const deleteBasketItemHandler = (id: number) => () => {
    return dispatch(deleteBasketItem(id))
  }

  const createOrder = () => {
    dispatch(addOrder())
  }

  const deleteAllItemsHandler = () => {
    return dispatch(deleteAllBasketItems())
  }

  return (
    <Container maxW={'container.xl'}>
      <Box className="flex justify-between items-center">
        <Text fontSize={'xl'} fontWeight="medium" className="mt-2">
          Корзина
        </Text>
        <Button
          onClick={deleteAllItemsHandler}
          variant={'ghost'}
          color="red.500"
          disabled={items.length === 0}
        >
          Удалить все
        </Button>
      </Box>
      <Box className="flex gap-x-6 mt-6 items-start">
        <Box width={'70%'} className="shadow-lg p-4 rounded-lg">
          {items &&
            items.map((item, index) => (
              <BasketItem
                key={`${item.id}_${index}`}
                item={item}
                changeAmountHandler={changeAmountHandler}
                deleteBasketItemHandler={deleteBasketItemHandler}
              />
            ))}
          {items && items.length === 0 && (
            <Box className="mt-9 text-center">
              <Text fontSize={'xl'} fontWeight="bold">
                Корзина пуста
              </Text>
              <Text className="mt-2" fontSize={'ml'}>
                Воспользуйтесь каталогом или поиском
              </Text>
            </Box>
          )}
        </Box>
        <Box className="shadow-lg p-4 rounded-lg sticky top-40" width={'30%'}>
          <Box className="flex justify-between items-center">
            <Text fontSize={'xl'}>Итого:</Text>
            <Text fontSize={'2xl'} fontWeight="bold">
              {totalAmount} &#8381;
            </Text>
          </Box>
          <Box>
            <Button
              className="w-full mt-6"
              disabled={items.length === 0}
              colorScheme={'blue'}
              onClick={createOrder}
            >
              Оформить заказ
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Basket
