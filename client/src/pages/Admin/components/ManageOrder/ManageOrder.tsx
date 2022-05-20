import { Box, Button, Input, InputGroup, Spinner, Text, useToast } from '@chakra-ui/react'
import useDebounce from 'hooks/useDebounce'
import OrderItem from 'pages/Orders/OrderItem'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { searchOrders } from 'store/order/order.action'
import { IOrder } from 'types/order.types'

const defaultShowItems = 15

const ManageOrder = () => {
  const [showItems, setShowItems] = useState(defaultShowItems)
  const [searchState, setSearchState] = useState('')
  const debouncedSearchState = useDebounce(searchState, 350)
  const [loading, setLoading] = useState(false)
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const dispatch = useAppDispatch()

  const { orders } = useAppSelector((state) => state.order)

  const displayedOrders = useMemo(() => {
    const result: IOrder[] = []
    if (!orders || orders.length === 0) return result
    for (let index = 0; index < showItems; index++) {
      const element = orders[index]
      if (!element) break
      result.push(element)
    }
    return result
  }, [showItems, orders])

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
        setShowItems(defaultShowItems)
      }
    }
    fetchSearchResult()
  }, [debouncedSearchState, dispatch, toast])

  const showMoreHandler = () => {
    const increaseShowItemsValue = 10
    setShowItems(showItems + increaseShowItemsValue)
  }

  const changeStatusHandler = () => {
    
  }

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
        {displayedOrders &&
          !loading &&
          displayedOrders.map((item, index) => (
            <OrderItem key={`${item.id}_${index}`} item={item} isAdmin={true} />
          ))}
      </Box>
      {displayedOrders && displayedOrders.length !== 0 && showItems < orders.length && !loading && (
        <Box className="mt-5 p-4 text-center">
          <Button onClick={showMoreHandler}>Показать еще</Button>
        </Box>
      )}
    </Box>
  )
}

export default ManageOrder
