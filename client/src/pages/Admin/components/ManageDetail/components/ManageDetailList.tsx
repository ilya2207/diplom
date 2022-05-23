import { Box, Button, InputGroup, Input, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IManageDetailCondition } from '../ManageDetail'

interface Props {
  changeCondtion: (state: IManageDetailCondition) => void
}

const ManageDetailList: React.FC<Props> = ({ changeCondtion }) => {
  const [searchState, setSearchState] = useState('')

  const addNewItemClickHandler = () => {
    changeCondtion({
      isMain: false,
      selectedItem: null,
    })
  }
  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Text fontSize="xl">Поиск детали</Text>
        <Button onClick={addNewItemClickHandler}>Добавить</Button>
      </Box>
      <InputGroup className="mt-4">
        <Input
          value={searchState}
          placeholder="Введите название или артикул детали"
          onChange={(e) => setSearchState(e.target.value)}
        />
      </InputGroup>
    </Box>
  )
}

export default ManageDetailList
