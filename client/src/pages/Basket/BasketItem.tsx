import { MinusIcon, AddIcon } from '@chakra-ui/icons'
import { Box, Button, Text } from '@chakra-ui/react'
import { DEFAULT_DETAIL_IMG } from 'constants/'
import React, { useState } from 'react'
import { IBasketItem } from 'types/basket.types'

interface IProps {
  item: IBasketItem
  changeAmountHandler: (id: number, amount: number) => void
  deleteBasketItemHandler: (id: number) => Promise<void>
}

const BasketItem: React.FC<IProps> = ({ changeAmountHandler, deleteBasketItemHandler, item }) => {
  const [loading, setLoading] = useState(false)

  const clickHandler = async () => {
    setLoading(true)
    await deleteBasketItemHandler(item.id ?? 0)
    setLoading(false)
  }
  return (
    <Box className="p-2 mt-2">
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
            <Box className="rounded-xl items-center inline-flex px-4 gap-2">
              <Button
                variant={'ghost'}
                disabled={item.amount === 1}
                onClick={() => changeAmountHandler(item.id ?? 0, item.amount - 1)}
              >
                <MinusIcon className="cursor-pointer" />
              </Button>
              <Text className="select-none" fontWeight={'medium'} fontSize={'xl'}>
                {item.amount}
              </Text>
              <Button
                variant={'ghost'}
                onClick={() => changeAmountHandler(item.id ?? 0, item.amount + 1)}
              >
                <AddIcon className="cursor-pointer" />
              </Button>
            </Box>
            <Button onClick={clickHandler} colorScheme={'red'} isLoading={loading}>
              Удалить
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BasketItem
