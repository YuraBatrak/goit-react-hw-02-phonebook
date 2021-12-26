import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

class ContactList extends Component {
  render() {
    const { filteredContacts, onDeleteContact } = this.props;

    return (
      <>
        {filteredContacts().length ? (
          <ul className={s.list}>
            {filteredContacts().map(({ name, number, id }) => {
              return (
                <li className={s.item} key={name}>
                  <p>
                    <span>{name} </span>
                    <span>{number}</span>
                  </p>
                  <button className={s.contactsbtn} onClick={() => onDeleteContact(id)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Contact list is empty</p>
        )}
      </>
    );
  }
}

ContactList.propTypes = {
  filteredContacts: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
