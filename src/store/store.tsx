import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import cvUploadSlice from './slices/cvUploadSlice'
import profileSlice from './slices/profileSlice'
import radarChartSlice from './slices/radarChartSlice'
import shareSlice from './slices/shareSlice'
import { authApi } from '../api/authApi'
import { profileApi } from '../api/profileApi'
import { radarApi } from '../api/radarApi'
import { shareApi } from '../api/shareApi'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cvUpload: cvUploadSlice,
    profile: profileSlice,
    radarChart: radarChartSlice,
    share: shareSlice,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [radarApi.reducerPath]: radarApi.reducer,
    [shareApi.reducerPath]: shareApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(
      authApi.middleware,
      profileApi.middleware,
      radarApi.middleware,
      shareApi.middleware
    ),
  devTools: import.meta.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch