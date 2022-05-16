import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props {
  disabled: boolean
  createOrder: () => Promise<void>
}
const BasketCreateOrder: React.FC<Props> = ({ createOrder, disabled }) => {
  const [loading, setLoading] = useState(false)

  const clickHandler = async () => {
    setLoading(true)
    await createOrder()
    setLoading(false)
  }

  return (
    <Box>
      <Button
        className="w-full mt-6"
        disabled={disabled}
        colorScheme={'blue'}
        isLoading={loading}
        onClick={clickHandler}
      >
        Оформить заказ
      </Button>
    </Box>
  )
}

export default BasketCreateOrder
