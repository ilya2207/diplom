import React from 'react'
import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import detailImg from 'assets/img/detail.png'
import ManageOrder from './components/ManageOrder/ManageOrder'
import ManageCategory from './components/ManageCategory/ManageCategory'
import ManageCarModel from './components/ManageCarModel/ManageCarModel'
import ManageDetail from './components/ManageDetail/ManageDetail'

const Admin = () => {
  return (
    <Container maxW={'container.xl'}>
      <Text className="sticky top-36 left-4" fontSize="1xl" fontWeight="bold">
        Админ-панель
      </Text>

      <Tabs>
        <Flex className="mt-4 w-full lowTablet:flex-col" justifyContent="space-between">
          <Box
            className="w-full max-w-xs sticky top-44 left-4 lowTablet:static lowTablet:mx-auto lowTablet:text-center"
            borderWidth="1px"
            borderRadius="lg"
            flexGrow={0}
            height="max-content"
          >
            <TabList flexDirection="column" borderBottom="none">
              <Tab className="py-3">
                <i className="fa-solid fa-clipboard-list mr-2"></i>Заказы
              </Tab>
              <Tab className="py-3">
                <i className="fa-solid fa-list mr-2"></i>Категории
              </Tab>
              <Tab className="py-3">
                <i className="fa-solid fa-car mr-2"></i>Модели
              </Tab>
              <Tab className="py-3">
                <img className="w-4 h-4 mr-2" src={detailImg} alt="" />
                Детали
              </Tab>
            </TabList>
          </Box>
          <Box className="flex-auto ml-7 lowTablet:ml-0 lowTablet:mt-2">
            <TabPanels>
              <TabPanel className="p-0">
                <ManageOrder />
              </TabPanel>
              <TabPanel className="p-0">
                <ManageCategory />
              </TabPanel>
              <TabPanel className="p-0">
                <ManageCarModel />
              </TabPanel>
              <TabPanel className="p-0">
                <ManageDetail />
              </TabPanel>
            </TabPanels>
          </Box>
        </Flex>
      </Tabs>
    </Container>
  )
}

export default Admin
