import React from 'react'
import {
  Box,
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { BreadCrumbsTitles } from 'constants/breadcrumbs'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { Link } from 'react-router-dom'

const SelectCategory = () => {
  const navigate = useNavigate()
  const { items } = useAppSelector((state) => state.category)
  const { pathname } = useLocation()
  return (
    <Container maxW={'container.xl'}>
      <Breadcrumbs
        items={[
          {
            title: BreadCrumbsTitles.MODEL,
            options: {
              onClick: () => navigate(-1),
            },
          },
          {
            title: BreadCrumbsTitles.CATEGORY,
          },
        ]}
      />
      <Box className="flex justify-between mt-2 items-center">
        <Text fontWeight={'medium'} fontSize={'xl'}>
          Выберите категорию запчастей
        </Text>
        <Link to={`${pathname}/category/1`}>
          <Button variant={'ghost'}>Пропустить</Button>
        </Link>
      </Box>
      <Tabs className="flex mt-4 gap-4">
        <TabList className="flex flex-col w-full max-w-xs shadow-sm border rounded-lg self-baseline">
          {items &&
            items.map((item) => (
              <Tab key={item.id} className="p-3">
                {item.title}
              </Tab>
            ))}
        </TabList>
        <TabPanels className="shadow-sm border rounded-lg">
          {items &&
            items.map((item, index) => (
              <TabPanel key={`${item.id}_${index}`} className="grid grid-cols-3">
                {item.childCategories &&
                  item.childCategories.map((item, index) => (
                    <Link key={`${item.id}_${index}`} to={`${pathname}/category/${item.id}`}>
                      <Text className="p-2 cursor-pointer hover:text-chakra-red-500">
                        {item.title}
                      </Text>
                    </Link>
                  ))}

                <Link
                  key={`${item.id}_${index}_${item.title}`}
                  to={`${pathname}/category/${item.id}`}
                >
                  <Text className="p-2 cursor-pointer text-chakra-blue-500 hover:text-chakra-red-500 ">
                    Все
                  </Text>
                </Link>
              </TabPanel>
            ))}
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default SelectCategory
