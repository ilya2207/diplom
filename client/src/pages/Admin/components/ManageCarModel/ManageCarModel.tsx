import React, { useEffect } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { fetchModel } from 'store/model/model.action'

const ManageCarModel = () => {
  const { items, loading } = useAppSelector((state) => state.model)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchModel())
    }
  }, [])

  return (
    <Box>
      <Box className="flex items-center justify-between">
        <Text fontSize="xl">Марки машин</Text>
        <Button>Добавить</Button>
      </Box>
      <Accordion className="mt-5" allowMultiple={true}>
        {items &&
          items.map((item) => (
            <AccordionItem>
              <AccordionButton className="flex justify-between items-center py-4">
                {item.title}
                <AccordionIcon className="ml-2" />
              </AccordionButton>
              <AccordionPanel></AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </Box>
  )
}

export default ManageCarModel
