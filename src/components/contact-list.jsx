import React from 'react'
import PropTypes from 'prop-types'
import { Card, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ContactCard from './contact-card'

function ContactList({contacts, errors, loading, deleteContact}) {
  const emptyMessage = (
    <Message info icon>
      <Icon name="warning circle" />
      <Message.Content>
        <Message.Header>No Contacts Found</Message.Header>
        <p>Add some new contacts to get started.</p>
        <Link to={'/contacts/new'} className="ui button primary">Add New Contact</Link>
      </Message.Content>
    </Message>
  )

  const cards = () => contacts.map(contact => (
    <ContactCard
      key={contact._id}
      contact={contact}
      deleteContact={deleteContact}
    />
  ))

  const contactList = <Card.Group itemsPerRow={4}>{cards()}</Card.Group>

  return (
    <div>
      {!contacts.length && !loading && !errors.global && emptyMessage}
      {contacts.length > 0 && contactList}
    </div>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
  errors: PropTypes.object,
  loading: PropTypes.bool
}

export default ContactList
