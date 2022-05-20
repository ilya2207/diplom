import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { orderStatusDisplayed } from 'types/order.types'
import styles from './OrderItem.module.scss'

interface IProps {
  isAdmin?: boolean
  changeHandler?: boolean
  status: string
}

const statusCircleColors = {
  confirmed: 'green',
  rejected: 'red',
  created: 'blue',
}
const OrderItemStatus: React.FC<IProps> = ({
  isAdmin = false,
  changeHandler = () => null,
  status,
}) => {
  if (isAdmin)
    return (
      <>
        <Menu>
          <MenuButton
            as={Button}
            className="relative"
            colorScheme={statusCircleColors[status]}
            rightIcon={<ChevronDownIcon />}
          >
            <Box>{orderStatusDisplayed[status]}</Box>
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
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
