// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit'
import { ICategoryItem } from 'types/category.types'

interface ICategoryInitState {
  items: ICategoryItem[]
  loading: boolean
  error: string
}

const initialState: ICategoryInitState = {
  error: '',
  loading: false,
  items: [],
}

export const categorySlice = createSlice({
  initialState,
  name: 'category',
  reducers: {},
})
