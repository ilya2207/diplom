import { AccordionItem, AccordionPanel, Box, Button } from '@chakra-ui/react'
import React from 'react'
import { ICategoryItem, ICategoryItemAdd } from 'types/category.types'
import CategoryListItemRow from './components/CategoryListItemRow'

interface CategoryListItemProps {
  item: ICategoryItem
  saveHandler: (id: number | null, body: ICategoryItem | ICategoryItemAdd) => void
  deleteHandler: (id: number) => void
  addChildCategoryHandler: (id: number) => void
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({
  item,
  saveHandler,
  deleteHandler,
  addChildCategoryHandler,
}) => {
  const addChild = () => addChildCategoryHandler(item.id)
  return (
    <AccordionItem>
      <CategoryListItemRow
        id={item.id ?? -1}
        saveHandler={saveHandler}
        isParent={true}
        title={item.title}
        parentCategoryId={item.id}
        deleteHandler={deleteHandler}
      />
      <AccordionPanel>
        {!!item?.childCategories?.length &&
          item.childCategories.map((element, index) => (
            <CategoryListItemRow
              key={`${element.id}_${index}`}
              deleteHandler={deleteHandler}
              saveHandler={saveHandler}
              id={element.id ?? -1}
              title={element.title}
              parentCategoryId={item.id}
            />
          ))}
        <Box textAlign="right">
          <Button
            color="gray.600"
            className="mr-4"
            variant={'ghost'}
            onClick={addChild}
            disabled={!item.title}
          >
            <i className="fa-solid fa-plus"></i>
          </Button>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default CategoryListItem
