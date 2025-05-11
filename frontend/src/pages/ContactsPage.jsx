import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { ContactsTable } from '../components/ContactsTable'
import { ContactModal } from '../components/ContactModal'
import { SettingsModal } from '../components/SettingsModal'
import { useContacts } from '../hooks/useContacts'
import { useGroups } from '../hooks/useGroups'

export const ContactsPage = () => {
  const [contactId, setContactId] = useState(null)
  const [isContactModal, setIsContactModal] = useState(false)
  const [isSettingsModal, setIsSettingsModal] = useState(false)

  const { contacts, deleteContact, updateContact, createContact } = useContacts()
  const { groups, deleteGroup, createGroup } = useGroups()
  const { categories, setCategories } = useCategories()

  const handleCreateContact = () => {
    setContactId(null)
    setIsSettingsModal(false)
    setIsContactModal(true)
  }
  const handleUpdateContact = (id) => {
    setContactId(id)
    setIsSettingsModal(false)
    setIsContactModal(true)
  }
  const handleCloseModals = () => {
    setContactId(null)
    setIsContactModal(false)
    setIsSettingsModal(false)
  }

  return (
    <main className="container" style={{ marginTop: '1rem' }}>
      <ContactModal
        id={contactId}
        groups={groups}
        contacts={contacts}
        isOpen={isContactModal}
        onClose={handleCloseModals}
        onUpdate={updateContact}
        onCreate={createContact}
      />

      {/*<SettingsModal*/}
      {/*  categories={categories}*/}
      {/*  setCategories={setCategories}*/}
      {/*  isOpen={isSettingsModal}*/}
      {/*  onClose={handleCloseModals}*/}
      {/*/>*/}

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
          <button className="contrast" onClick={() => handleCreateContact()} style={{ margin: 10 }}>
            + Добавить контакт
          </button>

          <button
            className="contrast"
            onClick={() => setIsSettingsModal(true)}
            style={{ margin: 10 }}
          >
            ⚙️
          </button>
        </div>
      </header>

      <ContactsTable
        categories={categories}
        contacts={contacts}
        groups={groups}
        onUpdate={handleUpdateContact}
        onDelete={deleteContact}
      />
    </main>
  )
}
