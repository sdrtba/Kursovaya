import { useState } from 'react'
import { ContactModal } from '../components/ContactModal'
import { ContactsTable } from '../components/ContactsTable'
import { useContacts } from '../hooks/useContacts'
import { useAuth } from '../hooks/useAuth'

export const ContactsPage = () => {
  const [token] = useAuth()
  const [id, setId] = useState(null)
  const [active, setActive] = useState(false)
  const { contacts, getContacts, deleteContact, updateContact, createContact } = useContacts(token)

  const openModal = (id) => {
    setActive(true)
    setId(id)
  }
  const closeModal = () => {
    setActive(false)
    setId(null)
  }

  return (
    <main className="container" style={{ marginTop: '2rem' }}>
      <ContactModal
        id={id}
        token={token}
        active={active}
        onClose={closeModal}
        getContacts={getContacts}
        handleUpdate={updateContact}
        handleCreate={createContact}
      />

      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <h1>📒 Мои контакты</h1>
        <button className="contrast" onClick={() => openModal(null)}>
          + Добавить контакт
        </button>
      </header>

      <ContactsTable contacts={contacts} onUpdate={openModal} onDelete={deleteContact} />
    </main>
  )
}
