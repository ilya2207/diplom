import { Box, Button, Container, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBasketItem, editBasketItem, fetchBasket } from 'store/basket/basket.action'
import { getBasketTotalAmount } from 'store/basket/basket.selector'
import { useAppSelector } from 'store/hooks'
import { addOrder } from 'store/order/order.action'
import BasketItem from './BasketItem'

const Basket = () => {
  const dispatch = useDispatch()
  const { items } = useAppSelector((state) => state.basket)
  const totalAmount = useAppSelector(getBasketTotalAmount)

  useEffect(() => {
    // @ts-expect-error
    dispatch(fetchBasket())
  }, [dispatch])
  const changeAmountHandler = (itemId: number, value: number) => {
    // @ts-expect-error
    return dispatch(editBasketItem({ id: itemId, amount: value }))
  }
  const deleteBasketItemHandler = (id: number) => () => {
    // @ts-expect-error
    return dispatch(deleteBasketItem(id))
  }
  const createOrder = () => {
    // @ts-expect-error
    dispatch(addOrder())
  }
  return (
    <Container maxW={'container.xl'}>
      <Text fontSize={'xl'} fontWeight="medium" className="mt-2">
        Корзина
      </Text>

      <Box className="flex gap-x-6 mt-4 items-start">
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
