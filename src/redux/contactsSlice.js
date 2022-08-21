import { createSlice } from '@reduxjs/toolkit';
import { contactsApi } from './contactsApiSlice';

const initialState = {
  items: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      contactsApi.endpoints.getContacts.matchFulfilled,
      (state, { payload }) => {
        state.items = payload;
      }
    );
  },
});

export const { addItems, removeItems } = contactsSlice.actions;

export default contactsSlice.reducer;
