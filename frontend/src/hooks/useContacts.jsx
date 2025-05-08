import { useState, useEffect } from 'react'
import { api } from '../api/axiosApi'

export const useContacts = (token) => {
  const [contacts, setContacts] = useState([])
  const [status, setStatus] = useState('')

  const getContacts = async (id = null) => {
    const url = id ? `/contacts/${id}/?contact_id=${id}` : '/contacts'

    try {
      const response = await api.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      if (id) return response.data
      setContacts(response.data)
    } catch (err) {
      setStatus('Ошибка во время получения контактов')
      console.error(err)
      return null
    }
  }

  const deleteContact = async (id) => {
    await api
      .delete(`/contacts/${id}/?contact_id=${id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(async () => {
        setStatus('Контакт удален')
        await getContacts().then()
      })
      .catch((err) => {
        setStatus('Ошибка во время удаления')
        console.error(err)
      })
  }

  const updateContact = async (contact) => {
    await api
      .put(
        `/contacts/${contact.id}/?contact_id=${contact.id}`,
        {
          first_name: contact.firstName,
          middle_name: contact.middleName,
          last_name: contact.lastName,
          email: contact.email,
          phone: contact.phone
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then(async () => {
        setStatus('Контакт обновлен')
        await getContacts().then()
      })
      .catch((err) => {
        setStatus('Ошибка во время обновления')
        console.error(err)
      })
  }

  const createContact = async (contact) => {
    await api
      .post(
        '/contacts',
        {
          first_name: contact.firstName,
          middle_name: contact.middleName,
          last_name: contact.lastName,
          email: contact.email,
          phone: contact.phone
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then(async () => {
        setStatus('Контакт создан')
        await getContacts().then()
      })
      .catch((err) => {
        setStatus('Ошибка во время создания')
        console.error(err)
      })
  }

  useEffect(() => {
    getContacts().then()
  }, [])

  return {
    contacts,
    status,
    getContacts,
    deleteContact,
    updateContact,
    createContact
  }
}
