import { SearchIcon } from '@chakra-ui/icons'
import { InputGroup, Button, Input } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { setDetailValues } from 'store/detail/detail.reducer'
import { useAppDispatch } from 'store/hooks'

interface ISearchValues {
  searchStr: string
}

const HeaderSearch = () => {
  const {
    formState: { isValid },
    register,
    handleSubmit,
  } = useForm<ISearchValues>({
    mode: 'onChange',
  })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const clickHandler = (values: ISearchValues) => {
    const { searchStr } = values
    dispatch(
      setDetailValues({
        currentPage: 1,
      })
    )
    return navigate(`/search/${searchStr}`)
  }
  return (
    <InputGroup className="relative lowTablet:order-3 lowTablet:mt-3">
      <Input
        {...register('searchStr', { required: true })}
        type="tel"
        placeholder="Введите артикул или наименование запчасти"
      />
      <Button disabled={!isValid} className="px-8" onClick={handleSubmit(clickHandler)}>
        <SearchIcon />
      </Button>
    </InputGroup>
  )
}

export default HeaderSearch
