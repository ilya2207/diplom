import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'

const ManageCarModel = () => {
  return (
    <Box>
      <Box className="flex items-center justify-between">
        <Text fontSize="xl">Марки машин</Text>
        <Button>Добавить</Button>
        
      </Box>
    </Box>
  )
}

export default ManageCarModel
