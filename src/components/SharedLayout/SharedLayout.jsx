import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { Li, Header, Container, Logo } from './SharedLayout.styled';

import Loader from '../Loader';

const SharedLayout = () => {
  return (
    <>
      <Header>
        <Logo>Phonebook</Logo>
        <nav>
          <ul>
            <Li>
              <NavLink to="/">Contacts</NavLink>
            </Li>
            <Li>
              <NavLink to="/add">Add Contact</NavLink>
            </Li>
          </ul>
        </nav>
      </Header>
      <Container>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};
export default SharedLayout;
