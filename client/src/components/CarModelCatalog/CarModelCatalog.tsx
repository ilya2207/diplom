import { Container, Grid, Text } from '@chakra-ui/react'
import React, { useEffect, useMemo } from 'react'
import CarModelCatalogItem from './components/CarModelCatalogItem'
import styles from './CarModelCatalog.module.scss'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'

interface IOnlyModelBrand {
  id: number
  title: string
}

const columnsCount = 5
let firstLetterModelTitle = ''

const CarModelCatalog = () => {
  const { items: models } = useAppSelector((state) => state.model)

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

  return (
    <Container className="mt-5" maxW={'container.xl'}>
      <Text fontSize="1xl" fontWeight="bold">
        Поиск запчастей по марке
      </Text>
      <Grid
        className="shadow-lg pl-8 mt-2 py-3"
        templateColumns={'repeat(4, 1fr)'}
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
                      <Link to={`/car/${item.id}`}>
                        <CarModelCatalogItem title={item.title} />
                      </Link>
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
