import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

interface IBreadCrumbItem {
  title: string
  to?: string
  options?: {}
}

interface Props {
  main?: boolean
  items: IBreadCrumbItem[]
}

const Breadcrumbs: React.FC<Props> = ({ main = true, items }) => {
  return (
    <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
      {main && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}

      {items &&
        items.map((item, index) => (
          <BreadcrumbItem key={`${item.title}_${index}`}>
            <BreadcrumbLink as={Link} to={item.to ?? ''} isCurrentPage={!item.to} {...item.options}>
              {item.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
    </Breadcrumb>
  )
}

export default Breadcrumbs
