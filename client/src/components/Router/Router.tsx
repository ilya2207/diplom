import { Box } from '@chakra-ui/react'
import CarModelCatalog from 'components/CarModelCatalog/CarModelCatalog'
import Loader from 'components/Loader/Loader'
import Basket from 'pages/Basket/Basket'
import CarModel from 'pages/CarModel/CarModel'
import SelectCategory from 'pages/SelectCategory/SelectCategory'
import ShowCatalog from 'pages/ShowCatalog/ShowCatalog'
import React, { lazy, ReactElement, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { selectUserType } from 'store/user/user.selector'

const Admin = lazy(() => import('../../pages/Admin/Admin'))

interface IRoutes {
  routes: string[]
  element: ReactElement
}

const routes: IRoutes[] = [
  {
    routes: ['/car/:carId/model/:modelId', '/category'],
    element: <SelectCategory />,
  },
  {
    routes: ['/'],
    element: <CarModelCatalog />,
  },
  {
    routes: ['/profile'],
    element: <div>Profile</div>,
  },
  {
    routes: ['orders'],
    element: <div>Orders</div>,
  },
  {
    routes: ['/car/:carId'],
    element: <CarModel />,
  },
  {
    routes: ['/basket'],
    element: <Basket />,
  },
  {
    routes: ['/car/:carId/model/:modelId/category/:categoryId'],
    element: <ShowCatalog />,
  },
  //   {
  //     routes: ['*'],
  //     element: <Navigate to="/" />,
  //   },
]

const Router = () => {
  const type = useAppSelector(selectUserType)

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
        {routes.map((parentItem) =>
          parentItem.routes.map((item) => <Route path={item} element={parentItem.element} />)
        )}
      </Routes>
    </Box>
  )
}

export default Router
