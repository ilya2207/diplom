import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Modal,
  Text,
} from '@chakra-ui/react'
import { DEFAULT_DETAIL_IMG } from 'constants/'
import React from 'react'
import { IOrder, OrderStatusType } from 'types/order.types'
import OrderItemStatus from './OrderItemStatus'

interface IProps {
  item: IOrder
  isAdmin?: boolean
  changeStatusHandler?: (orderId: number, status: OrderStatusType, rejectedMessage?: string) => void
}

const OrderItem: React.FC<IProps> = ({ item, isAdmin = false, changeStatusHandler }) => {
  const clickHandler = (status: OrderStatusType, rejectedMessage?: string) => () => {
    if (changeStatusHandler) {
      changeStatusHandler(item.id, status, rejectedMessage)
    }
  }

  return (
    <Box className="mt-2 p-4 w-full" maxW={'700px'} borderWidth={'1px'} borderRadius="lg">
      <Box className="flex justify-between items-center">
        <Text fontSize={'lg'}>Заказ №{item.orderNumber}</Text>
        <OrderItemStatus status={item.status} isAdmin={isAdmin} changeHandler={clickHandler} />
      </Box>
      <Box className="flex justify-between mt-1">
        <Text>Дата заказа: {item.createdAt.slice(0, 10)}</Text>
        <Box className="flex gap-1">
          Общая сумма: <Text fontWeight={'medium'}>{item.totalPrice}&#8381;</Text>
        </Box>
      </Box>
      {isAdmin && item.user && (
        <Box className="flex justify-between items-center">
          <Box>
            ФИО заказчика: {`${item.user.secondname} ${item.user.firstname} ${item.user.lastname}`}
          </Box>
          <Box>Телефон заказчика: {item.user.phone}</Box>
        </Box>
      )}
      {item.status === 'rejected' && item.rejectedReason && (
        <Box className="flex justify-between items-center text-chakra-red-500 font-semibold">
          <Text>Причина отклонения</Text>
          <Text>{item.rejectedReason}</Text>
        </Box>
      )}
      <Box className="mt-2">
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton className="flex justify-between items-center pl-0">
              <Text>Товары</Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {item.orderItems &&
                item.orderItems.map((item, index) => (
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
                            <Text fontWeight={'medium'}>
                              {item.amount} * {item.detail?.price}&#8381;
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  )
}
export default OrderItem
