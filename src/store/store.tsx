import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import cvUploadSlice from './slices/cvUploadSlice'
import profileSlice from './slices/profileSlice'
import radarChartSlice from './slices/radarChartSlice'
import shareSlice from './slices/shareSlice'
import { baseApi } from '../api/baseApi'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cvUpload: cvUploadSlice,
    profile: profileSlice,
    radarChart: radarChartSlice,
    share: shareSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(
      baseApi.middleware,
    ),
  devTools: import.meta.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch