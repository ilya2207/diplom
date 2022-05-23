import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { orderStatusDisplayed, OrderStatusType } from 'types/order.types'
import styles from './OrderItem.module.scss'

interface IProps {
  isAdmin?: boolean
  changeHandler: (status: OrderStatusType, rejectedMessage?: string) => () => void
  status: string
}

const statusCircleColors = {
  confirmed: 'green',
  rejected: 'red',
  created: 'blue',
}
const OrderItemStatus: React.FC<IProps> = ({ isAdmin = false, changeHandler, status }) => {
  if (isAdmin)
    return (
      <>
        <Menu autoSelect={false}>
          <MenuButton
            as={Button}
            className="relative"
            colorScheme={statusCircleColors[status]}
            rightIcon={<ChevronDownIcon />}
          >
            <Box>{orderStatusDisplayed[status]}</Box>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={changeHandler('confirmed')}>Подтвержден</MenuItem>
            <MenuItem onClick={changeHandler('rejected')}>Отменен</MenuItem>
          </MenuList>
        </Menu>
      </>
    )
  return (
    <>
      <Box className="relative px-3">
        <Box
          className={`${styles.status__circle}`}
          style={{ backgroundColor: statusCircleColors[status] }}
        ></Box>
        <Text>{orderStatusDisplayed[status]}</Text>
      </Box>
    </>
  )
}

export default OrderItemStatus
