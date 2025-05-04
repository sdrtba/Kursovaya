import React, { useEffect, useState, useRef } from 'react'
import { api } from '../api/axiosApi.js'
import styles from '../styles/modal.module.css'

export const ContactModal = ({ active, onClose, token, id, getContacts }) => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')
  const modalRef = useRef(null)

  useEffect(() => {
    const getContact = async () => {
      try {
        const response = await api.get(`/contacts/${id}?contact_id=${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })

        const data = response.data
        setFirstName(data.first_name)
        setMiddleName(data.middle_name)
        setLastName(data.last_name)
        setEmail(data.email)
        setPhone(data.phone)
      } catch (err) {
        setStatus(err.response?.data?.detail || 'Что-то пошло не так')
      }
    }

    if (id) {
      getContact()
    }
  }, [id, token])

  useEffect(() => {
    if (active) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
      cleanFormData()
    }
  }, [active])

  const cleanFormData = () => {
    setFirstName('')
    setMiddleName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setStatus('')
  }

  const handleCreateContact = async (e) => {
    e.preventDefault()
    try {
      await api.post(
        '/contacts',
        {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          email: email,
          phone: phone
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }
      )

      cleanFormData()
      setStatus('Контакт создан')
      getContacts()
    } catch (err) {
      setStatus('Что-то пошло не так')
    }
  }

  const handleUpdateContact = async (e) => {
    e.preventDefault()
    try {
      await api.put(
        `/contacts/${id}?contact_id=${id}`,
        {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          email: email,
          phone: phone
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }
      )

      cleanFormData()
      setStatus('Контакт обновлен')
      getContacts()
    } catch (err) {
      setStatus('Что-то пошло не так')
    }
  }

  return (
    <dialog ref={modalRef} onClose={onClose} open>
      <article className={styles.modal}>
        <header className={styles.modalHeader}>
          <h3>{id ? '✏️ Обновить' : '➕ Создать'}</h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="close"
            style={{ marginLeft: 'auto' }}
          ></button>
        </header>

        <form onSubmit={id ? handleUpdateContact : handleCreateContact}>
          <section className={styles.modalForm}>
            {status && (
              <p
                className={
                  status.toLowerCase().includes('что-то')
                    ? styles.statusError
                    : styles.statusSuccess
                }
                style={{
                  color: status && !status.toLowerCase().includes('что-то') ? 'green' : 'crimson'
                }}
              >
                {status}
              </p>
            )}

            <input
              type="text"
              placeholder="Имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Фамилия"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Отчество"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Почта (опционально)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Телефон (опционально)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </section>

          <footer
            className={styles.modalFooter}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem',
              marginTop: '1.5rem'
            }}
          >
            <button type="button" onClick={onClose} className="secondary">
              Cancel
            </button>
            <button type="submit" className={id ? 'contrast' : 'primary'}>
              {id ? 'Update' : 'Create'}
            </button>
          </footer>
        </form>
      </article>
    </dialog>
  )
}
