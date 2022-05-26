import { Box, Text } from '@chakra-ui/react'
import { DEFAULT_DETAIL_IMG } from 'constants/'
import React from 'react'

const DetailListItem = ({ item }) => {
  return (
    <Box
      className="select-none flex flex-col justify-between items-center p-6 shadow-md rounded-lg mobile:max-w-[200px] mobile:mx-auto"
      border="1px solid #ededed"
    >
      <img
        className="w-full"
        src={item.img ?? DEFAULT_DETAIL_IMG}
        alt=""
        style={{ maxWidth: '200px' }}
      />
      <Text className="text-center" mt={1} fontSize={'lg'} fontWeight="medium">
        {item.title}
      </Text>
      <Text color={'gray.500'} className="self-end">
        {item.shortDescription}
      </Text>
      <Text className="text-center" fontWeight={'bold'} fontSize="xl" color={'black'}>
        {item.price}&#8381;
      </Text>
    </Box>
  )
}

export default DetailListItem
