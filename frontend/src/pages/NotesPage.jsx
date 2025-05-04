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
    getContacts()
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

      {loaded && contacts?.length ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="striped">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Фамилия</th>
                <th>Почта</th>
                <th>Телефон</th>
                <th>Дата обновления</th>
                <th style={{ textAlign: 'center' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.first_name}</td>
                  <td>{contact.middle_name}</td>
                  <td>{contact.last_name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
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
