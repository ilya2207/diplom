import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Text } from '@chakra-ui/react'
import { DEFAULT_DETAIL_IMG } from 'constants/'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBasketItem, editBasketItem, fetchBasket } from 'store/basket/basket.action'
import { getBasketTotalAmount } from 'store/basket/basket.selector'
import { useAppSelector } from 'store/hooks'

const Basket = () => {
  const dispatch = useDispatch()
  const { items } = useAppSelector((state) => state.basket)
  const totalAmount = useAppSelector(getBasketTotalAmount)
  console.log(totalAmount)

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
  return (
    <Container maxW={'container.xl'}>
      <Text fontSize={'xl'} fontWeight="medium" className="mt-2">
        Корзина
      </Text>

      <Box className="flex gap-x-6 mt-4 items-start">
        <Box width={'70%'} className="shadow-lg p-4 rounded-lg">
          {items &&
            items.map((item, index) => (
              <Box key={`${item.id}_${index}`} className="p-2 mt-2">
                <Box className="flex items-start">
                  <Box>
                    <img
                      className="w-full"
                      style={{ maxWidth: '150px' }}
                      src={item.detail?.img ?? DEFAULT_DETAIL_IMG}
                      alt=""
                    />
                  </Box>
                  <Box className="w-full ml-6">
                    <Box className="flex justify-between items-center w-full">
                      <Box>
                        <Text fontSize={'md'}>{item.detail?.title}</Text>
                        <Text fontSize={'md'}>{item.detail?.shortDescription}</Text>
                      </Box>
                      <Box>
                        <Text fontSize={'lg'} fontWeight={'medium'}>
                          {item.detail?.price}&#8381;
                        </Text>
                      </Box>
                    </Box>
                    <Box className="mt-3 flex justify-between items-center">
                      <Box className="border rounded-xl items-center inline-flex px-4 gap-2">
                        <Button
                          variant={'ghost'}
                          onClick={() => changeAmountHandler(item.id ?? 0, item.amount + 1)}
                        >
                          <AddIcon className="cursor-pointer" />
                        </Button>
                        <Text className="select-none" fontWeight={'medium'} fontSize={'xl'}>
                          {item.amount}
                        </Text>
                        <Button
                          variant={'ghost'}
                          disabled={item.amount === 1}
                          onClick={() => changeAmountHandler(item.id ?? 0, item.amount - 1)}
                        >
                          <MinusIcon className="cursor-pointer" />
                        </Button>
                      </Box>
                      <Button onClick={deleteBasketItemHandler(item.id ?? 0)} colorScheme={'red'}>
                        Удалить
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
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
            <Button className="w-full mt-6" colorScheme={'blue'}>
              Оформить заказ
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Basket
