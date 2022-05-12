import { useToast, Box, Spinner } from '@chakra-ui/react'
import CatalogItem from 'pages/ShowCatalog/components/CatalogItem'
import CatalogPagination from 'pages/ShowCatalog/components/CatalogPagination'
import CatalogSortSelect from 'pages/ShowCatalog/components/CatalogSortSelect'
import React, { useEffect } from 'react'
import { addBasketItem } from 'store/basket/basket.action'
import { setDetailValues } from 'store/detail/detail.reducer'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { IBasketItem } from 'types/basket.types'

const ShowItems = () => {
  const {
    items: details,
    loading,
    isAuth,
  } = useAppSelector((state) => ({
    items: state.detail.items,
    loading: state.detail.loading,
    isAuth: state.user.isAuth,
  }))
  const dispatch = useAppDispatch()
  const toast = useToast({
    duration: 1000,
    isClosable: true,
    position: 'top-right',
    status: 'success',
  })
  const addToBasketHandler = async (data: IBasketItem) => {
    try {
      await dispatch(addBasketItem(data)).unwrap()
      toast.closeAll()
      toast({
        title: 'Успешно добавлено',
      })
    } catch (error) {
      console.log(error)

      toast.closeAll()
      toast({
        title: 'Произошла ошибка. Попробуйте еще раз',
        duration: 3000,
        status: 'error',
      })
    }
  }
  useEffect(() => {
    return () => {
      dispatch(
        setDetailValues({
          currentPage: 1,
        })
      )
    }
  }, [dispatch])
  return (
    <>
      <CatalogSortSelect />
      {loading && (
        <Box className="text-center flex justify-center w-full">
          <Spinner width="150px" height="150px" color="blue.500" speed="0.8s" marginTop="10vh" />
        </Box>
      )}
      <Box className="grid grid-cols-5 gap-10 ">
        {details &&
          !loading &&
          details.map((item, index) => (
            <CatalogItem
              key={`${item.id}_${index}`}
              isAuth={isAuth}
              item={item}
              basketHandler={addToBasketHandler}
            />
          ))}
      </Box>
      <CatalogPagination />
    </>
  )
}

export default ShowItems
