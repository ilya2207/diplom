import { MinusIcon, AddIcon } from '@chakra-ui/icons'
import { Box, Button, Text, Tooltip } from '@chakra-ui/react'
import { DEFAULT_DETAIL_IMG } from 'constants/'
import React, { useState } from 'react'
import { IBasketItem } from 'types/basket.types'
import { IDetail } from 'types/detail.types'

interface Props {
  item: IDetail
  basketHandler: (data: IBasketItem) => Promise<void>
  isAuth: boolean
}

const CatalogItem: React.FC<Props> = ({ item, basketHandler, isAuth }) => {
  const [amount, setAmount] = useState<number>(1)
  const [loading, setLoading] = useState(false)

  const clickHandler = async () => {
    setLoading(true)
    await basketHandler({ amount: +amount, detailId: item.id })
    setLoading(false)
  }

  return (
    <Box
      className="min-h-[400px]  select-none flex flex-col justify-between p-6 shadow-md rounded-lg mobile:max-w-[200px] mobile:mx-auto"
      border="1px solid #ededed"
    >
      <img
        className="w-full max-w-[200px] h-[140px] object-contain self-center"
        src={item.img ?? DEFAULT_DETAIL_IMG}
        alt=""
      />
      <Text className="text-left max-w-full" mt={1} fontSize={'sm'} fontWeight="medium">
        {item.title}
      </Text>
      <Box className="justify-between items-center flex w-full flex-wrap max-w-full">
        <Text fontSize={'sm'} color={'gray.500'}>
          Артикул:
        </Text>
        <Text fontSize={'sm'} className="max-w-full" color={'gray.500'}>
          {item.vendorCode ?? '-'}
        </Text>
      </Box>
      <Text className="text-center" fontWeight={'bold'} fontSize="md" color={'black'}>
        {item.price}&#8381;
      </Text>
      <Box className="flex justify-center flex-col items-center mt-2 gap-1 w-full">
        <Box className="rounded-xl w-full justify-between items-center inline-flex  gap-2">
          <Button variant={'ghost'} disabled={amount === 1} onClick={() => setAmount(amount - 1)}>
            <MinusIcon className="cursor-pointer" />
          </Button>
          <Text className="select-none" fontWeight={'medium'} fontSize={'xl'}>
            {amount}
          </Text>
          <Button variant={'ghost'} onClick={() => setAmount(amount + 1)}>
            <AddIcon className="cursor-pointer" />
          </Button>
        </Box>
        {!isAuth && (
          <Box className="catalog__item_tooltip_wrapper">
            <Tooltip
              width={'100%'}
              label="Корзина доступна только авторизированным пользователям"
              shouldWrapChildren
              flex={'1 1 auto'}
              style={{ width: '100%' }}
            >
              <Button className="w-full" disabled colorScheme={'red'}>
                В корзину
              </Button>
            </Tooltip>
          </Box>
        )}
        {isAuth && (
          <Button
            isLoading={loading}
            onClick={clickHandler}
            colorScheme={'red'}
            flex={'1 1 auto'}
            width="100%"
          >
            В корзину
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default CatalogItem
