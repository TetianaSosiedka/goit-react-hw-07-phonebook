import { useSelector } from 'react-redux';
import {
  useUpdateContactsMutation,
  useGetContactsQuery,
} from '../../redux/contactsApiSlice';

import { useNavigate } from 'react-router-dom';

import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { Form } from './Filter.styled';

import useGetContact from '../../hooks/useGetContact';

import Button from '@mui/material/Button';

//-----------------------------------------------------

const NewContactForm = () => {
  const [updateItem, { isLoading, isSuccess, isError, isUninitialized }] =
    useUpdateContactsMutation();
  const itemsState = useSelector(state => state.contacts.items);
  const { data } = useGetContactsQuery('', { skip: itemsState.length !== 0 });

  const items = itemsState || data;

  const navigate = useNavigate();

  const { name, phone, setState } = useGetContact();

  const idInputName = nanoid();
  const idInputNumber = nanoid();

  const handeInputChange = event => {
    setState(event.target.name, event.target.value);
  };

  const addDateForm = contact => {
    const incontacts = items.find(item => item.name === contact.name);
    if (incontacts) {
      Notiflix.Report.warning(
        'Warning',
        `${contact.name} is alredy incontacts`,
        'Cancel',
        function cb() {
          // callback
        }
      );
      return;
    }
    updateItem(contact);
  };

  const handleSubmit = event => {
    event.preventDefault();

    addDateForm({ name, phone });

    setState();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label htmlFor={idInputName}>
          <span>Name</span>
          <input
            id={idInputName}
            onChange={handeInputChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
          />
        </label>
        <label htmlFor={idInputNumber}>
          <span>Number</span>
          <input
            id={idInputNumber}
            onChange={handeInputChange}
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={phone}
          />
        </label>

        <Button
          variant="contained"
          size="small"
          type="submit"
          disabled={isLoading}
        >
          {' '}
          Add contact
        </Button>
      </Form>
      {!isUninitialized &&
        isSuccess &&
        Notiflix.Report.success(
          'Success',
          'Contact added',
          'Ok',
          function cb() {
            navigate(`/`);
          }
        )}
      {!isUninitialized &&
        isError &&
        Notiflix.Report.failure(
          'Server error',
          'Contact support',
          'Ok',
          function cb() {
            // callback
          }
        )}
    </>
  );
};

export default NewContactForm;
