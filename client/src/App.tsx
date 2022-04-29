import { Box } from '@chakra-ui/react'
import CarModelCatalog from 'components/CarModelCatalog/CarModelCatalog'
import Header from 'components/Header/Header'
import Loader from 'components/Loader/Loader'
import React, { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { fetchCategoryItems } from 'store/catalog/category.action'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useGetUserQuery } from 'store/services/auth'
import { fetchUserData } from 'store/user/user.action'
import { selectUserToken, selectUserType } from 'store/user/user.selector'

const Admin = lazy(() => import('./pages/Admin/Admin'))

function App() {
  const token = useAppSelector(selectUserToken)
  const type = useAppSelector(selectUserType)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(null))
    }
    dispatch(fetchCategoryItems())
  }, [])

  return (
    <div className="app">
      <Header />
      <Box className="mt-5">
        <Routes>
          <Route path="/" element={<CarModelCatalog />} />
          <Route path="/profile" />
          <Route path="/orders" />
          {type === 'admin' && (
            <Route
              path="/admin"
              element={
                <Suspense fallback={<Loader />}>
                  <Admin />
                </Suspense>
              }
            />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </div>
  )
}

export default App
