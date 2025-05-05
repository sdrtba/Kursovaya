import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { api } from '../api/axiosApi.js'
import { ContactModal } from '../components/ContactModal'

export const NotesPage = () => {
  const [token] = useAuth()
  const [status, setStatus] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [contacts, setContacts] = useState([])
  const [active, setActive] = useState(false)
  const [id, setId] = useState(null)

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('date_updated') // или 'first_name', 'last_name' и т.д.
  const [sortOrder, setSortOrder] = useState('desc') // 'asc' или 'desc'

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

  const openModal = () => setActive(true)
  const closeModal = () => {
    setActive(false)
    setId(null)
  }

  const handleUpdate = async (id) => {
    setId(id)
    openModal()
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contacts/${id}/?contact_id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })

      await getContacts()
    } catch (err) {
      setStatus('Не удалось удалить')
      console.error(err)
    }
  }

  const getContacts = async () => {
    try {
      const response = await api.get('/contacts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })

      setContacts(response.data)
      setLoaded(true)
    } catch (err) {
      setStatus(err.response?.data?.detail || 'Что-то пошло не так')
    }
  }

  useEffect(() => {
    getContacts().then()
  }, [])

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
        <div style={{ overflowX: 'auto' }}>
          <table className="striped">
            <thead>
              <tr>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Почта</th>
                <th>Телефон</th>
                <th>Дата обновления</th>
                <th style={{ textAlign: 'center' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedContacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="table-cell-truncate" title={contact.middle_name}>
                    {contact.middle_name}
                  </td>
                  <td className="table-cell-truncate" title={contact.first_name}>
                    {contact.first_name}
                  </td>
                  <td className="table-cell-truncate" title={contact.last_name}>
                    {contact.last_name}
                  </td>
                  <td className="table-cell-truncate" title={contact.email}>
                    {contact.email}
                  </td>
                  <td className="table-cell-truncate" title={contact.phone}>
                    {contact.phone}
                  </td>
                  <td>{new Date(contact.date_updated).toLocaleString()}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button className="secondary" onClick={() => handleUpdate(contact.id)}>
                        ✏️
                      </button>
                      <button
                        className="outline"
                        style={{ color: 'crimson' }}
                        onClick={() => handleDelete(contact.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ marginTop: '1rem' }}>{loaded ? 'Не найдено.' : 'Загрузка...'}</p>
      )}
    </main>
  )
}
