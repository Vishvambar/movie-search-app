import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './moviesSlice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})
