import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62ff4d5234344b6431f64f5d.mockapi.io/api/v1/contacts',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ``,
      providesTags: ['Contacts'],
    }),

    deleteContact: builder.mutation({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),

    updateContacts: builder.mutation({
      query: payload => ({
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useUpdateContactsMutation,
} = contactsApi;
