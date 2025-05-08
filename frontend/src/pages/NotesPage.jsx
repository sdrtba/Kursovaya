import { useState } from 'react'
import { ContactModal } from '../components/ContactModal'
import { useContacts } from '../hooks/useContacts'
import { ContactsTable } from '../components/ContactsTable.jsx'
import { useAuth } from '../hooks/useAuth.jsx'

export const NotesPage = () => {
  const { contacts, status, loaded, getContacts, handleDelete } = useContacts()
  const [active, setActive] = useState(false)
  const [id, setId] = useState(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('date_updated') // или 'first_name', 'last_name' и т.д.
  const [sortOrder, setSortOrder] = useState('desc') // 'asc' или 'desc'
  const [token] = useAuth()

  const openModal = () => setActive(true)
  const closeModal = () => {
    setActive(false)
    setId(null)
  }

  const handleUpdate = async (id) => {
    setId(id)
    openModal()
  }

  const filteredAndSortedContacts = [...contacts]
    .filter((contact) => {
      const fullName =
        `${contact.last_name} ${contact.first_name} ${contact.middle_name}`.toLowerCase()
      return (
        fullName.includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase())
      )
    })
    .sort((a, b) => {
      const fieldA = a[sortBy]
      const fieldB = b[sortBy]

      if (!fieldA || !fieldB) return 0

      if (sortOrder === 'asc') {
        return fieldA > fieldB ? 1 : -1
      } else {
        return fieldA < fieldB ? 1 : -1
      }
    })

  return (
    <main className="container" style={{ marginTop: '2rem' }}>
      <ContactModal
        active={active}
        onClose={closeModal}
        token={token}
        id={id}
        getContacts={getContacts}
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
        <button className="contrast" onClick={openModal}>
          + Добавить контакт
        </button>
      </header>

      {status && (
        <p
          style={{
            color: status.toLowerCase().includes('success') ? 'green' : 'crimson',
            marginBottom: '1rem'
          }}
        >
          {status}
        </p>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Поиск по имени или почте"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ flex: 1 }}>
          <option value="date_updated">Дата обновления</option>
          <option value="first_name">Имя</option>
          <option value="last_name">Фамилия</option>
          <option value="email">Почта</option>
        </select>

        <button
          className="secondary"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          style={{ height: '9vh' }}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {loaded && contacts?.length ? (
        <div style={{ overflowX: 'auto' }}></div>
      ) : (
        <p style={{ marginTop: '1rem' }}>{loaded ? 'Не найдено.' : 'Загрузка...'}</p>
      )}

      <ContactsTable
        contacts={filteredAndSortedContacts}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </main>
  )
}
