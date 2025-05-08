import { useState, useEffect } from 'react'
import { api } from '../api/axiosApi'
import { useAuth } from './useAuth'

export const useContacts = () => {
  const [token] = useAuth()
  const [contacts, setContacts] = useState([])
  const [status, setStatus] = useState('')
  const [loaded, setLoaded] = useState(false)

  const getContacts = async () => {
    await api
      .get('/contacts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      .then((response) => {
        setContacts(response.data)
        setLoaded(true)
      })
      .catch((err) => {
        setStatus(err.response?.data?.detail || 'Что-то пошло не так')
      })
  }

  const handleDelete = async (id) => {
    await api
      .delete(`/contacts/${id}/?contact_id=${id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(async () => {
        await getContacts()
      })
      .catch((err) => {
        setStatus('Не удалось удалить')
        console.error(err)
      })
  }

  useEffect(() => {
    getContacts().then()
  }, [])

  return {
    contacts,
    status,
    loaded,
    getContacts,
    handleDelete
  }
}
