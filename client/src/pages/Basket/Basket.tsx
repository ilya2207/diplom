import { Box, Button, Container, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {
  deleteAllBasketItems,
  deleteBasketItem,
  editBasketItem,
  fetchBasket,
} from 'store/basket/basket.action'
import { getBasketTotalAmount } from 'store/basket/basket.selector'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { addOrder } from 'store/order/order.action'
import BasketCreateOrder from './BasketCreateOrder'
import BasketItem from './BasketItem'

const Basket = () => {
  const dispatch = useAppDispatch()
  const { loading, items, totalAmount } = useAppSelector((state) => ({
    items: state.basket.items,
    totalAmount: getBasketTotalAmount(state),
    loading: state.basket.loading,
  }))

  useEffect(() => {
    dispatch(fetchBasket())
  }, [dispatch])

  const changeAmountHandler = (itemId: number, value: number) => {
    return dispatch(editBasketItem({ id: itemId, amount: value }))
  }

  const deleteBasketItemHandler = async (id: number) => {
    await dispatch(deleteBasketItem(id))
  }

  const createOrder = async () => {
    await dispatch(addOrder())
  }

  const deleteAllItemsHandler = () => {
    return dispatch(deleteAllBasketItems())
  }

  return (
    <Container maxW={'container.xl'}>
      <Box className="flex justify-between items-center ">
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
      <Box className="flex gap-x-6 mt-6 items-start lowTablet:flex-col lowTablet:items-center">
        <Box width={'70%'} className="shadow-lg p-4 rounded-lg lowTablet:w-full">
          {loading && items.length === 0 && (
            <Box className="text-center flex justify-center w-full">
              <Spinner width="100px" height="100px" color="blue.500" speed="0.8s" />
            </Box>
          )}
          {items &&
            items.map((item, index) => (
              <BasketItem
                key={`${item.id}_${index}`}
                item={item}
                changeAmountHandler={changeAmountHandler}
                deleteBasketItemHandler={deleteBasketItemHandler}
              />
            ))}
          {items && items.length === 0 && !loading && (
            <Box className="mt-9 text-center lowTablet:mt-2">
              <Text fontSize={'xl'} fontWeight="bold">
                Корзина пуста
              </Text>
              <Text className="mt-2" fontSize={'ml'}>
                Воспользуйтесь каталогом или поиском
              </Text>
            </Box>
          )}
        </Box>
        <Box
          className="shadow-lg p-4 rounded-lg sticky top-40 lowTablet:w-full lowTablet:static"
          width={'30%'}
        >
          <Box className="flex justify-between items-center">
            <Text fontSize={'xl'}>Итого:</Text>
            <Text fontSize={'2xl'} fontWeight="bold">
              {totalAmount} &#8381;
            </Text>
          </Box>
          <BasketCreateOrder disabled={items.length === 0} createOrder={createOrder} />
        </Box>
      </Box>
    </Container>
  )
}

export default Basket
