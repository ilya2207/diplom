import { Box, Input, InputGroup, Spinner, Text, useToast } from '@chakra-ui/react'
import useDebounce from 'hooks/useDebounce'
import OrderItem from 'pages/Orders/OrderItem'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { searchOrders } from 'store/order/order.action'

const ManageOrder = () => {
  const [searchState, setSearchState] = useState('')
  const debouncedSearchState = useDebounce(searchState, 350)
  const [loading, setLoading] = useState(false)
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const dispatch = useAppDispatch()

  const { orders } = useAppSelector((state) => state.order)

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        if (debouncedSearchState !== '') {
          setLoading(true)
          await dispatch(searchOrders(debouncedSearchState))
        }
      } catch (error) {
        toast({
          title: 'Что-то пошло не так, попробуйте позже',
        })
      } finally {
        setLoading(false)
      }
    }
    fetchSearchResult()
  }, [debouncedSearchState, dispatch, toast])

  return (
    <Box>
      <Box>
        <Text fontSize="xl">Поиск заказа</Text>
        <InputGroup className="mt-1">
          <Input
            value={searchState}
            placeholder="Введите номер заказа или телефон пользователя"
            onChange={(e) => setSearchState(e.target.value)}
          />
        </InputGroup>
      </Box>
      <Box className="mt-4">
        {loading && (
          <Box className="text-center">
            <Spinner width="75px" height="75px" color="blue.500" speed="0.8s" marginTop="10vh" />
          </Box>
        )}
        {orders &&
          !loading &&
          orders.map((item, index) => <OrderItem key={`${item.id}_${index}`} item={item} />)}
      </Box>
    </Box>
  )
}

export default ManageOrder
