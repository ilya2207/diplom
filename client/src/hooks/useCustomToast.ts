import { useToast } from '@chakra-ui/react'
import { AnyAction } from '@reduxjs/toolkit'
import { useAppDispatch } from 'store/hooks'

export const useCustomToast = (actionCreator: AnyAction) => {
  const toast = useToast()
  const dispatch = useAppDispatch()
  const toastHandler = (options) => {
    toast(options)
    dispatch(actionCreator)
  }
  return toastHandler
}
