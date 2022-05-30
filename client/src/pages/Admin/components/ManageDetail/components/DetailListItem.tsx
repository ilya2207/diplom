import { Box, Text } from '@chakra-ui/react'
import { DEFAULT_DETAIL_IMG } from 'constants/'
import React from 'react'

interface Props {
  item: any
  deleteHandler: (id: number) => void
  editHandler: (item) => void
}

const DetailListItem: React.FC<Props> = ({ item, deleteHandler, editHandler }) => {
  return (
    <Box
      className="select-none flex flex-col justify-between items-center p-6 shadow-md rounded-lg mobile:max-w-[200px] mobile:mx-auto"
      border="1px solid #ededed"
    >
      <Box className="text-right w-full">
        <i
          className="cursor-pointer text-chakra-blue-500 fa-solid fa-pen p-1 "
          onClick={() => editHandler(item)}
        ></i>
        <i
          className="cursor-pointer text-chakra-red-500 fa-solid fa-trash-can p-1 ml-2"
          onClick={() => deleteHandler(item.id)}
        ></i>
      </Box>
      <img
        className="w-full mt-8"
        src={item.img ?? DEFAULT_DETAIL_IMG}
        alt=""
        style={{ maxWidth: '150px' }}
      />
      <Text className="text-center max-w-full" mt={1} fontSize={'lg'} fontWeight="medium">
        {item.title}
      </Text>
      <Box className="justify-between items-center flex w-full flex-wrap max-w-full">
        <Text color={'gray.500'}>Артикул:</Text>
        <Text className="max-w-full" color={'gray.500'}>
          {item.vendorCode ?? '-'}
        </Text>
      </Box>
      <Text className="text-center" fontWeight={'bold'} fontSize="xl" color={'black'}>
        {item.price}&#8381;
      </Text>
    </Box>
  )
}

export default DetailListItem
