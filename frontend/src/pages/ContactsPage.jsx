import { useState } from 'react'
import { ContactModal } from '../components/ContactModal'
import { ContactsTable } from '../components/ContactsTable'
import { useContacts } from '../hooks/useContacts'
import { useAuth } from '../hooks/useAuth'
import { SettingsModal } from '../components/SettingsModal.jsx'

export const ContactsPage = () => {
  const [token] = useAuth()
  const [id, setId] = useState(null)
  const [isContactModal, setIsContactModal] = useState(false)
  const [isSettingsModal, setIsSettingsModal] = useState(false)
  const [categories, setCategories] = useState({
    last_name: { label: 'Фамилия', visible: true },
    first_name: { label: 'Имя', visible: false },
    middle_name: { label: 'Отчество', visible: true },
    email: { label: 'Почта', visible: false },
    phone: { label: 'Телефон', visible: false },
    date_updated: { label: 'Дата обновления', visible: true }
  })
  const { contacts, getContacts, deleteContact, updateContact, createContact } = useContacts(token)

  const openSettingsModal = () => {
    setIsSettingsModal(true)
    setId(id)
  }
  const openContactModal = (id) => {
    setIsContactModal(true)
    setId(id)
  }
  const closeModal = () => {
    setIsContactModal(false)
    setIsSettingsModal(false)
    setId(null)
  }

  return (
    <main className="container" style={{ marginTop: '2rem' }}>
      <ContactModal
        id={id}
        token={token}
        active={isContactModal}
        onClose={closeModal}
        getContacts={getContacts}
        handleUpdate={updateContact}
        handleCreate={createContact}
      />

      <SettingsModal
        categories={categories}
        active={isSettingsModal}
        onClose={closeModal}
        setCategories={setCategories}
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
        <div>
          <button
            className="contrast"
            onClick={() => openContactModal(null)}
            style={{ margin: 10 }}
          >
            + Добавить контакт
          </button>

          <button className="contrast" onClick={() => openSettingsModal()} style={{ margin: 10 }}>
            ⚙️
          </button>
        </div>
      </header>

      <ContactsTable
        contacts={contacts}
        categories={categories}
        onUpdate={openContactModal}
        onDelete={deleteContact}
      />
    </main>
  )
}
