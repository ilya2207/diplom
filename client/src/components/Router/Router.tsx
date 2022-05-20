import { Box, Spinner } from '@chakra-ui/react'

import React, { lazy, ReactElement, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { selectUserAuth, selectUserType } from 'store/user/user.selector'

const Admin = lazy(() => import('pages/Admin/Admin'))
const CarModelCatalog = lazy(() => import('components/CarModelCatalog/CarModelCatalog'))
const Basket = lazy(() => import('pages/Basket/Basket'))
const CarModel = lazy(() => import('pages/CarModel/CarModel'))
const Orders = lazy(() => import('pages/Orders/Orders'))
const Profile = lazy(() => import('pages/Profile/Profile'))
const SearchResult = lazy(() => import('pages/SearchResult/SearchResult'))
const SelectCategory = lazy(() => import('pages/SelectCategory/SelectCategory'))
const ShowCatalog = lazy(() => import('pages/ShowCatalog/ShowCatalog'))
const ShowCatalogCategory = lazy(() => import('pages/ShowCatalogCategory/ShowCatalogCategory'))

interface IRoutes {
  routes: string[]
  element: ReactElement
}

const authRoutes: IRoutes[] = [
  {
    routes: ['/profile'],
    element: <Profile />,
  },
  {
    routes: ['orders'],
    element: <Orders />,
  },
  {
    routes: ['/basket'],
    element: <Basket />,
  },
]

const publicRoutes: IRoutes[] = [
  {
    routes: ['/car/:carId/model/:modelId', '/category'],
    element: <SelectCategory />,
  },
  {
    routes: ['/'],
    element: <CarModelCatalog />,
  },

  {
    routes: ['/car/:carId'],
    element: <CarModel />,
  },
  {
    routes: ['/search/:searchStr'],
    element: <SearchResult />,
  },
  {
    routes: ['/car/:carId/model/:modelId/category/:categoryId'],
    element: <ShowCatalog />,
  },
  {
    routes: ['/category/:categoryId'],
    element: <ShowCatalogCategory />,
  },
  {
    routes: ['*'],
    element: <Navigate to="/" />,
  },
]

const Router = () => {
  const { type, isAuth } = useAppSelector((state) => ({
    type: selectUserType(state),
    isAuth: selectUserAuth(state),
  }))
  return (
    <Box className="mt-5">
      <Suspense
        fallback={
          <Box className="text-center mt-10">
            <Spinner color="blue.500" width={'150px'} height="150px" speed="0.8s" />
          </Box>
        }
      >
        <Routes>
          {type === 'admin' && <Route path="/admin" element={<Admin />} />}
          {isAuth &&
            authRoutes.map((parentItem) =>
              parentItem.routes.map((item) => <Route path={item} element={parentItem.element} />)
            )}
          {publicRoutes.map((parentItem) =>
            parentItem.routes.map((item) => <Route path={item} element={parentItem.element} />)
          )}
        </Routes>
      </Suspense>
    </Box>
  )
}

export default Router
