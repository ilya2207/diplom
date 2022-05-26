import { Box, FormLabel, Input } from '@chakra-ui/react'
import useDebounce from 'hooks/useDebounce'
import React, { useEffect, useRef, useState } from 'react'
import { searchAdminValues } from 'store/admin/admin.action'
import { InitStateKeysType, resetValues } from 'store/admin/admin.slice'
import { useAppDispatch, useAppSelector } from 'store/hooks'

interface Props {
  title: string
  itemsKey: InitStateKeysType
}

const SelectDetailRelations: React.FC<Props> = ({ itemsKey, title }) => {
  const [focus, setFocus] = useState(false)
  const [input, setInput] = useState('')
  const items = useAppSelector((state) => state.admin[itemsKey])
  const wrapperRef = useRef(null)
  const debouncedInputValue = useDebounce(input, 350)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (debouncedInputValue !== '') {
      dispatch(searchAdminValues({ searchStr: debouncedInputValue, type: itemsKey }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, itemsKey])

  useEffect(() => {
    const clickHandler = (e) => {
      if (!e.path.includes(wrapperRef.current)) {
        setFocus(false)
      }
    }

    window.addEventListener('click', clickHandler)

    return () => {
      dispatch(resetValues())
      window.removeEventListener('click', clickHandler)
    }
  }, [])

  return (
    <Box ref={wrapperRef}>
      <FormLabel>{title}</FormLabel>
      <Box className="relative">
        <Input
          onFocus={() => setFocus(true)}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {focus && <Box>{items && items.map((item) => <div>{item.title}</div>)}</Box>}
      </Box>
    </Box>
  )
}

export default SelectDetailRelations
