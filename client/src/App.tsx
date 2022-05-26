import Header from 'components/Header/Header'
import Router from 'components/Router/Router'
import React, { useEffect } from 'react'
import { fetchCategoryItems } from 'store/catalog/category.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchModel } from 'store/model/model.action'
import { fetchUserData } from 'store/user/user.action'
import { selectUserToken } from 'store/user/user.selector'
import 'assets/styles/index.scss'
import Footer from 'components/Footer/Footer'
import { Box } from '@chakra-ui/react'

function App() {
  const token = useAppSelector(selectUserToken)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData())
    }
    dispatch(fetchCategoryItems())
    dispatch(fetchModel())
  }, [])

  return (
    <Box className="app flex min-h-screen flex-col justify-between">
      <Box>
        <Header />
        <Router />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
