import './App.css';
import { Component } from 'react';
import shortid from 'shortid';

import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/filter/Filter';
import ContactList from './components/ContactLis/ContactList ';

import contacts from './data/contacts.json';

class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  };

  componentDidMount() {
    const { contacts } = this.state;
    const getContactArrayLS = localStorage.getItem('contacts');
    this.setState({
      contacts: JSON.parse(getContactArrayLS) ? JSON.parse(getContactArrayLS) : contacts,
    });
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    const setContactArrayLS = JSON.stringify(contacts);
    localStorage.setItem('contacts', setContactArrayLS);
  }

  formSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.some(e => e.name === name)) {
      alert(`${name} is already in contacts!`);
    } else {
      this.setState(({ contacts }) => {
        return {
          contacts: [...contacts, { name, number, id: shortid.generate() }],
        };
      });
    }
  };

  filterHandler = value => {
    this.setState(() => ({
      filter: value,
    }));
  };

  deleteUserHandler = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const filteredContacts = () => {
      const { filter, contacts } = this.state;
      const normalizedFilter = filter.toLowerCase();
      const filteredArray = contacts.filter(
        ({ name, number }) =>
          name.toLowerCase().includes(normalizedFilter) ||
          number.toLowerCase().includes(normalizedFilter),
      );
      return filteredArray;
    };
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter onFilter={this.filterHandler} />
        <ContactList filteredContacts={filteredContacts} onDeleteContact={this.deleteUserHandler} />
      </div>
    );
  }
}

export default App;
