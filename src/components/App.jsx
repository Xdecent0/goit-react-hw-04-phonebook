import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import css from 'components/App.module.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function App() {
  const defaultValue = '';
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts') ?? defaultValue);
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in your contact list`);
      return;
    }

    setContacts([contact, ...contacts]);
  };

  const deleteContact = deleteContactId => {
    setContacts(contacts.filter(contact => contact.id !== deleteContactId));
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const loweredFilter = filter.toLowerCase();

  const filterContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(loweredFilter);
  });

  return (
    <div className={css.section}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        filterContacts={filterContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      number: PropTypes.number,
    })
  ),
};
