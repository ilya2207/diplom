import { Box, Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { setDetailValues } from 'store/detail/detail.reducer'
import { useAppDispatch, useAppSelector } from 'store/hooks'

const CatalogPagination = () => {
  const dispatch = useAppDispatch()
  const { currentPage, totalCount, itemsToDisplay } = useAppSelector((state) => state.detail)
  const totalPages = Math.ceil(totalCount / itemsToDisplay)

  const paginationItems = (() => {
    if (!totalPages) return [1]
    const res: number[] = []
    // If pages < 5
    if (totalPages < 5) {
      for (let index = 1; index <= totalPages; index++) {
        res.push(index)
      }
      return res
    }
    // Expression because if currPage = 1 || 2 first page will be -2
    if (currentPage === 1 || currentPage === 2) return [1, 2, 3, 4, 5]
    const diffPage = totalPages - currentPage
    // If currentPage last or pre-last
    if (diffPage <= 1) {
      const startPage = currentPage - (5 - diffPage) + 1
      for (let index = startPage; index <= startPage + 4; index++) {
        res.push(index)
      }
      return res
    }
    // Default behaviour
    for (let index = -2; index <= 2; index++) {
      res.push(currentPage + index)
    }
    return res
  })()

  const setCurrentPage = (currentPage: number) => () => {
    dispatch(setDetailValues({ currentPage }))
  }

  return (
    <Box className="flex mt-10 items-center gap-6 p-4 justify-center">
      <Button
        onClick={setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        colorScheme={'blue'}
        variant="ghost"
      >
        Назад
      </Button>
      <Box className="flex gap-2">
        <Button
          onClick={setCurrentPage(1)}
          disabled={currentPage === 1}
          colorScheme={'blue'}
          variant="ghost"
        >
          &lt;
        </Button>
        {paginationItems.map((item, index) => (
          <Button
            key={`${item}_${index}`}
            onClick={setCurrentPage(item)}
            isActive={currentPage === item}
            colorScheme={'blue'}
     
            

            variant="ghost"
    >
            {item}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages || !totalPages}
          onClick={setCurrentPage(totalPages)}
          colorScheme={'blue'}
          variant="ghost"
        >
          &gt;
        </Button>
      </Box>
      <Button
        onClick={setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || !totalPages}
        colorScheme={'blue'}
        variant="ghost"
      







      >
        Вперед
      </Button>
    </Box>
  )
}

export default CatalogPagination








