import { Container, Text } from '@chakra-ui/react'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ShowItems from 'components/ShowItems/ShowItems'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { searchDetail } from 'store/detail/detail.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'

const SearchResult = () => {
  const { searchStr = null } = useParams()
  const dispatch = useAppDispatch()
  const { currentPage, itemsToDisplay } = useAppSelector((state) => state.detail)

  useEffect(() => {
    if (searchStr) {
      dispatch(searchDetail({ searchStr, page: currentPage, items: itemsToDisplay }))
    }
  }, [currentPage, dispatch, itemsToDisplay, searchStr])

  return (
    <Container maxW={'container.xl'}>
      <Breadcrumbs
        items={[
          {
            title: 'Результаты поиска',
          },
        ]}
      />
      <Text className="mt-2" fontWeight={'medium'} fontSize={'xl'}>
        Результаты поиска по запросу '{searchStr}'
      </Text>
      <ShowItems />
    </Container>
  )
}

export default SearchResult
