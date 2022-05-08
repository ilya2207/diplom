import { Box, Button, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IDetail } from 'types/detail.types'

interface Props {
  item: IDetail
}

const CatalogItem: React.FC<Props> = ({ item }) => {
  const [amount, setAmount] = useState('1')
  return (
    <Box
      className="flex flex-col items-center p-6 shadow-md rounded-lg"
      width={'23%'}
      border="1px solid #ededed"
    >
      <img
        className="w-full"
        src={item.img ?? 'http://localhost:5000/images/detail/default.jpg'}
        alt=""
        style={{ maxWidth: '200px' }}
      />
      <Text mt={1} fontSize={'lg'} fontWeight="medium">
        {item.title}
      </Text>
      <Text color={'gray.500'} className="self-end">
        {item.shortDescription}
      </Text>
      <Text fontWeight={'bold'} fontSize="xl" color={'black'}>
        {item.price}&#8381;
      </Text>
      <Box className="flex items-center mt-2 gap-1 w-full">
        <Input
          maxWidth={'50px'}
          type={'number'}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button colorScheme={'red'} flex={'1 1 auto'} className="w-full">
          В корзину
        </Button>
      </Box>
    </Box>
  )
}

export default CatalogItem
