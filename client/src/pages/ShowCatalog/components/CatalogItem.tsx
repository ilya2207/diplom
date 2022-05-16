import { Box, Button, Input, Text, Tooltip } from '@chakra-ui/react'
import { DEFAULT_DETAIL_IMG } from 'constants/'
import React, { useState } from 'react'
import { IBasketItem } from 'types/basket.types'
import { IDetail } from 'types/detail.types'

interface Props {
  item: IDetail
  basketHandler: (data: IBasketItem) => void
  isAuth: boolean
}

const CatalogItem: React.FC<Props> = ({ item, basketHandler, isAuth }) => {
  const [amount, setAmount] = useState('1')
  
  return (
    <Box
      className="flex flex-col justify-between items-center p-6 shadow-md rounded-lg"
      border="1px solid #ededed"
    >
      <img
        className="w-full"
        src={item.img ?? DEFAULT_DETAIL_IMG}
        alt=""
        style={{ maxWidth: '200px' }}
      />
      <Text className='text-center' mt={1} fontSize={'lg'} fontWeight="medium">
        {item.title}
      </Text>
      <Text color={'gray.500'} className="self-end">
        {item.shortDescription}
      </Text>
      <Text className='text-center' fontWeight={'bold'} fontSize="xl" color={'black'}>
        {item.price}&#8381;
      </Text>
      <Box className="flex justify-between items-center mt-2 gap-1 w-full">
        <Input
          maxWidth={'50px'}
          type={'number'}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {!isAuth && (
          <Tooltip
            label="Корзина доступна только авторизированным пользователям"
            shouldWrapChildren
            flex={'1 1 auto'}
          >
            <Button disabled colorScheme={'red'}>
              В корзину
            </Button>
          </Tooltip>
        )}
        {isAuth && (
          <Button
            onClick={() => basketHandler({ amount: +amount, detailId: item.id })}
            colorScheme={'red'}
            flex={'1 1 auto'}
            maxWidth="108px"
          >
            В корзину
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default CatalogItem
