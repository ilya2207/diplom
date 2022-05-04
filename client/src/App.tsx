import Header from 'components/Header/Header'
import Router from 'components/Router/Router'
import React, { useEffect } from 'react'
import { fetchCategoryItems } from 'store/catalog/category.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchModel } from 'store/model/model.action'
import { fetchUserData } from 'store/user/user.action'
import { selectUserToken } from 'store/user/user.selector'

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
    <div className="app">
      <Header />
      <Router />
    </div>
  )
}

export default App
