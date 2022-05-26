import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Box className="bg-chakra-blue-800 text-white mt-8 ">
      <Container className="p-4 " maxWidth={'container.xl'}>
        <Box className="flex justify-between items-center">
          <Link to={'/'}>
            <Text className="font-title" fontSize="3xl">
              АвтоЗапчасти
            </Text>
          </Link>
          <a href="tel:79050408374">
            <Text fontSize={'lg'}>
              <i className="fa-solid fa-phone mr-3"></i>79050408374
            </Text>
          </a>
        </Box>
        <Box className="text-right">&copy; Автозапчасти 2022. Все права защищены</Box>
      </Container>
    </Box>
  )
}

export default Footer
