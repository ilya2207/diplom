import { Stack, Skeleton } from '@chakra-ui/react'
import React from 'react'

const CatalogItemSkeleton = () => {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  )
}

export default CatalogItemSkeleton
