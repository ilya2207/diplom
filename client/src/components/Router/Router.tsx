import { Box } from '@chakra-ui/react'
import CarModelCatalog from 'components/CarModelCatalog/CarModelCatalog'
import Loader from 'components/Loader/Loader'
import Basket from 'pages/Basket/Basket'
import CarModel from 'pages/CarModel/CarModel'
import Profile from 'pages/Profile/Profile'
import SelectCategory from 'pages/SelectCategory/SelectCategory'
import ShowCatalog from 'pages/ShowCatalog/ShowCatalog'
import React, { lazy, ReactElement, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { selectUserAuth, selectUserType } from 'store/user/user.selector'

const Admin = lazy(() => import('../../pages/Admin/Admin'))

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
    element: <div>Orders</div>,
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
    routes: ['/car/:carId/model/:modelId/category/:categoryId'],
    element: <ShowCatalog />,
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
      <Routes>
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
        {isAuth &&
          authRoutes.map((parentItem) =>
            parentItem.routes.map((item) => <Route path={item} element={parentItem.element} />)
          )}
        {publicRoutes.map((parentItem) =>
          parentItem.routes.map((item) => <Route path={item} element={parentItem.element} />)
        )}
      </Routes>
    </Box>
  )
}

export default Router
