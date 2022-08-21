import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import SharedLayout from '../SharedLayout';

const ContactsBook = lazy(() =>
  import('../../pages/contactsBook' /* webpackChunkName: "ContactsBook" */)
);
const AddContact = lazy(() =>
  import('../../pages/addContact' /* webpackChunkName: "AddContact" */)
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<ContactsBook />} />
        <Route path="add" element={<AddContact />} />
      </Route>
    </Routes>
  );
};
