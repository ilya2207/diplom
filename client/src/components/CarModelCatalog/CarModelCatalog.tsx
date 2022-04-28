import { Container, Grid, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState, useEffect, useMemo } from 'react'
import CarModelItem from './components/CarModelItem'
import styles from './CarModelCatalog.module.scss'
import axiosApi from 'utils/api'

interface IOnlyModelBrand {
  id: number
  title: string
}

const columnsCount = 5
let firstLetterModelTitle = ''

const CarModelCatalog = () => {
  const [models, setModels] = useState<IOnlyModelBrand[]>([])

  const displayedModels = useMemo(() => {
    const itemsInRow = Math.ceil(models.length / columnsCount)
    let result: [IOnlyModelBrand[]] = [[]]
    models.forEach((item, index) => {
      if (index % itemsInRow === 0 && index !== 0) {
        return result.push([item])
      }
      result[result.length - 1].push(item)
    })
    return result
  }, [models])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosApi.get<IOnlyModelBrand[]>('model')

      setModels(response.data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    firstLetterModelTitle = models[0]?.title[0]
  }, [models])

  return (
    <Container className="mt-5" maxW={'container.xl'}>
      {/* <InputGroup className="max-w-sm">
        <Input placeholder="Введите марку авто" />
        <InputRightElement
          pointerEvents="none"
          children={<i className="fa-solid fa-car text-chakra-blue-500"></i>}
        />
      </InputGroup> */}
      <Text fontSize="1xl" fontWeight="bold">
        Выберите марку авто
      </Text>
      <Grid
        className="shadow-lg pl-8 mt-2 py-3"
        templateColumns={'repeat(5, 1fr)'}
        borderWidth="1px"
        borderRadius="lg"
      >
        {!!displayedModels.length &&
          displayedModels.map((item, index) => {
            return (
              <div key={`_${index}`}>
                {item.map((item, index) => {
                  const isFirstLetter =
                    item.title[0] === firstLetterModelTitle ? null : item.title[0]
                  if (!!isFirstLetter) firstLetterModelTitle = item.title[0]
                  return (
                    <div className="relative pl-7" key={`${item.id}_${index}`}>
                      <Text
                        fontSize={'xl'}
                        className={`absolute left-2 ${styles.first_letter}`}
                        color={'red.500'}
                      >
                        {isFirstLetter}
                      </Text>
                      <CarModelItem title={item.title} />
                    </div>
                  )
                })}
              </div>
            )
          })}
      </Grid>
    </Container>
  )
}

export default CarModelCatalog
