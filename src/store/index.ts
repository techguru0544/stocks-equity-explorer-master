import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiService } from '@services/api.service.ts';

export const store = configureStore({
  devTools: import.meta.env.MODE === 'development',
  reducer: {
    [apiService.reducerPath]: apiService.reducer // Using RTK-Query used in this for the stock pages
  },
  middleware: gdm =>
    gdm({
      serializableCheck: false
    }).concat(apiService.middleware)
});

setupListeners(store.dispatch);
