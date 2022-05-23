import {
  Box,
  Button,
  Input,
  InputGroup,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import useDebounce from 'hooks/useDebounce'
import OrderItem from 'pages/Orders/OrderItem'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { changeOrderStatus, searchOrders } from 'store/order/order.action'
import { IOrder, OrderStatusType } from 'types/order.types'
import RejectOrderModal from './components/RejectOrderModal'

const defaultShowItems = 15

const ManageOrder = () => {
  const [showItems, setShowItems] = useState(defaultShowItems)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedOrderId, setSelectedOrderId] = useState<number>(0)
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

  const changeStatusHandler = async (
    orderId: number,
    status: OrderStatusType,
    rejectedMessage?: string
  ) => {
    if (status === 'rejected' && !isOpen) {
      setSelectedOrderId(orderId)
      return onOpen()
    }
    await dispatch(changeOrderStatus({ orderId, status, rejectedMessage }))
    onClose()
  }

  return (
    <Box>
      <Box>
        <Text fontSize="xl">Поиск заказа</Text>
        <InputGroup className="mt-4">
          <Input
            value={searchState}
            placeholder="Введите номер заказа или телефон пользователя"
            onChange={(e) => setSearchState(e.target.value)}
          />
        </InputGroup>
      </Box>
      <Box className="mt-4 flex items-center flex-col">
        {loading && (
          <Box className="text-center">
            <Spinner width="75px" height="75px" color="blue.500" speed="0.8s" marginTop="10vh" />
          </Box>
        )}
        {displayedOrders &&
          !loading &&
          displayedOrders.map((item, index) => (
            <OrderItem
              key={`${item.id}_${index}`}
              item={item}
              isAdmin={true}
              changeStatusHandler={changeStatusHandler}
            />
          ))}
      </Box>
      {displayedOrders && displayedOrders.length !== 0 && showItems < orders.length && !loading && (
        <Box className="mt-5 p-4 text-center">
          <Button onClick={showMoreHandler}>Показать еще</Button>
        </Box>
      )}
      <RejectOrderModal
        isOpen={isOpen}
        orderId={selectedOrderId}
        onClose={onClose}
        submitHandler={changeStatusHandler}
      />
    </Box>
  )
}

export default ManageOrder
