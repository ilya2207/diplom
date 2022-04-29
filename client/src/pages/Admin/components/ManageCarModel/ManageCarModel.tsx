import React, { useEffect } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchModel } from 'store/model/model.action'

const ManageCarModel = () => {
  const { items, loading } = useAppSelector((state) => state.model)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchModel())
    }
  }, [])

  return (
    <Box>
      <Box className="flex items-center justify-between">
        <Text fontSize="xl">Марки машин</Text>
        <Button>Добавить</Button>
      </Box>
      <Box>{items && items.map((item) => <Box>{item.title}</Box>)}</Box>
    </Box>
  )
}

export default ManageCarModel
