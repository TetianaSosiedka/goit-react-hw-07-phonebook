import { useState } from 'react';

const useGetContact = () => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');

  const setState = (targetName, targetValue) => {
    switch (targetName) {
      case 'name':
        setName(targetValue);
        break;

      case 'phone':
        setNumber(targetValue);
        break;

      default:
        setName('');
        setNumber('');
        break;
    }
  };

  return { name, phone, setState };
};

export default useGetContact;
