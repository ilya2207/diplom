import { Box, Button, InputGroup, Input, Text, useToast, Spinner } from '@chakra-ui/react'
import useDebounce from 'hooks/useDebounce'
import React, { useEffect, useMemo, useState } from 'react'
import { detailAdminSearch } from 'store/detail/detail.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { IOrder } from 'types/order.types'
import { IManageDetailCondition } from '../ManageDetail'

import DetailListItem from './DetailListItem'

interface Props {
  changeCondtion: (state: IManageDetailCondition) => void
}

const defaultShowItems = 15

const ManageDetailList: React.FC<Props> = ({ changeCondtion }) => {
  const [searchState, setSearchState] = useState('')

  const [showItems, setShowItems] = useState(defaultShowItems)
  const debouncedSearchState = useDebounce(searchState, 350)
  const [loading, setLoading] = useState(false)
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const dispatch = useAppDispatch()

  const { details } = useAppSelector((state) => state.admin)

  const displayedDetails = useMemo(() => {
    const result: IOrder[] = []
    if (!details || details.length === 0) return result
    for (let index = 0; index < showItems; index++) {
      const element = details[index]
      if (!element) break
      result.push(element)
    }
    return result
  }, [showItems, details])

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        if (debouncedSearchState !== '') {
          setLoading(true)
          await dispatch(detailAdminSearch(debouncedSearchState))
        }
      } catch (error) {
        toast({
          title: 'Что-то пошло не так, попробуйте позже',
        })
      } finally {
        setLoading(false)
        setShowItems(defaultShowItems)
      }
    }
    fetchSearchResult()
  }, [debouncedSearchState, dispatch, toast])

  console.log(displayedDetails)

  const showMoreHandler = () => {
    const increaseShowItemsValue = 15
    setShowItems(showItems + increaseShowItemsValue)
  }
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
      <Box className="grid grid-cols-3 justify-around gap-5 mt-6">
        {loading && (
          <Box className="text-center">
            <Spinner width="75px" height="75px" color="blue.500" speed="0.8s" marginTop="10vh" />
          </Box>
        )}
        {displayedDetails &&
          displayedDetails.map((item, index) => (
            <DetailListItem key={`${item.id}_${index}`} item={item} />
          ))}
      </Box>
      {displayedDetails && displayedDetails.length !== 0 && showItems < details.length && !loading && (
        <Box className="mt-5 p-4 text-center">
          <Button onClick={showMoreHandler}>Показать еще</Button>
        </Box>
      )}
    </Box>
  )
}

export default ManageDetailList
