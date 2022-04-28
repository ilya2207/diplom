import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const userState = (state: RootState) => state.user

export const selectUserState = createDraftSafeSelector(userState, (state) => state)

export const selectUserToken = createDraftSafeSelector(
  userState,
  (state) => state.user.accessToken ?? null
)

export const selectUserType = createDraftSafeSelector(
  userState,
  (state) => state.user.type ?? 'user'
)
