import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const userState = (state: RootState) => state.model

// export const selectSelectedModel = createDraftSafeSelector(
//   userState,
//   (state) => state.user.accessToken ?? null
// )

// export const selectUserType = createDraftSafeSelector(
//   userState,
//   (state) => state.user.type ?? 'user'
// )

export {}
