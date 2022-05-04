import { Text } from '@chakra-ui/react'
import React from 'react'
import styles from '../CarModelCatalog.module.scss'

const CarModelCatalogItem = ({ title }) => {
  return (
    <Text fontSize={'xl'} className={`cursor-pointer mx-1 ${styles.carmodel__item}`}>
      {title}
    </Text>
  )
}

export default CarModelCatalogItem
