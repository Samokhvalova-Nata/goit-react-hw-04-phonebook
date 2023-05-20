import { useState, useEffect } from 'react';
import { Container, Titile, SubTitile } from './App.styled';
import { ContactForm } from '../ContactForm';
import { Filter } from '../Filter';
import { ContactList } from '../ContactList';
import { nanoid } from 'nanoid';
import initialContacts from '../../data/contacts.json';

export const App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromLS = localStorage.getItem('contact');
    const parsedContactsFromLS = JSON.parse(contactsFromLS);
    if (parsedContactsFromLS) {
      setContacts(parsedContactsFromLS)
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (values) => {
    const newName = contacts.some(contact =>
      contact.name.toLowerCase() === values.name.toLowerCase());
    if (newName) {
      return alert(`${values.name} is already in contacts`);
    }
    setContacts(prev => prev.concat({ ...values, id: nanoid() }))
  }

  const deleteContact = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId))
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  }

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)).sort((a, b) => a.name.localeCompare(b.name));
  }

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <Titile>Phonebook</Titile>
      <ContactForm onSubmit={formSubmitHandler} />
        
      <SubTitile>Contacts</SubTitile>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </Container>
  );
};
