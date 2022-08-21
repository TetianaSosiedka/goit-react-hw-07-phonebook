import { configureStore } from '@reduxjs/toolkit';

//import { setupListeners } from '@reduxjs/toolkit/query';
import { contactsApi } from './contactsApiSlice';
import contacts from './contactsSlice';
import filter from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts,
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

//setupListeners(store.dispatch);
