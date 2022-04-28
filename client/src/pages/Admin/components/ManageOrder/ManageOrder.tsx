import { Box, Input, InputGroup, Text } from '@chakra-ui/react'
import useDebounce from 'hooks/useDebounce'
import React, { useEffect, useState } from 'react'
import axiosApi from 'utils/api'

const ManageOrder = () => {
  const [searchState, setSearchState] = useState('')
  const debouncedSearchState = useDebounce(searchState, 350)

  useEffect(() => {
    const searchReq = async () => {
      const res = await axiosApi.get(`/detail?search=${debouncedSearchState}`)
      //   console.log(res)
    }
    searchReq()
    console.log(debouncedSearchState)
  }, [debouncedSearchState])

  return (
    <Box>
      <Text fontSize="xl">Поиск заказа</Text>
      <InputGroup className="mt-1">
        <Input
          value={searchState}
          placeholder="Введите номер заказа"
          onChange={(e) => setSearchState(e.target.value)}
        />
      </InputGroup>
    </Box>
  )
}

export default ManageOrder
