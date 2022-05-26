import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { IDetail } from 'types/detail.types'
import ManageDetailList from './components/ManageDetailList'
import AddDetail from './components/AddDetail'

export interface IManageDetailCondition {
  isMain: boolean
  selectedItem: IDetail | null
}

const ManageDetail = () => {
  const [condition, setCondition] = useState<IManageDetailCondition>({
    isMain: true,
    selectedItem: null,
  })
  const { isMain, selectedItem } = condition
  return (
    <Box>
      {isMain && <ManageDetailList changeCondtion={setCondition} />}
      {!isMain && <AddDetail changeCondition={setCondition} selectedItem={selectedItem} />}
    </Box>
  )
}

export default ManageDetail
