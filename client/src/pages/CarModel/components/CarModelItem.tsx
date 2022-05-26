import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IModel } from 'types/model.types'

interface Props {
  item: IModel
  linkPath: string
}

const CarModelItem: React.FC<Props> = ({ item, linkPath }) => {
  const navigate = useNavigate()

  return (
    <Box
      className="w-1/4 flex flex-col justify-between cursor-pointer"
      onClick={() => navigate(`${linkPath}/model/${item.id}`, { replace: false })}
    >
      <Box className="p-2">
        <img
          className="object-cover "
          src={item.img ?? 'http://localhost:5000/images/model/default.png'}
          alt=""
          style={{ width: '198px', height: '125px', margin: '0 auto' }}
        />
      </Box>
      <Box className="flex justify-center items-center gap-1 mt-1" fontSize={'xl'}>
        <Text className="text-center">{item.title},</Text>
        <Text color={'gray.400'}>{item.model}</Text>
      </Box>
      <Box className="text-center">
        <Text>{item.releaseDate}</Text>
      </Box>
    </Box>
  )
}

export default CarModelItem
