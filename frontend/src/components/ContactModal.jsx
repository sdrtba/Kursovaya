import React, { useEffect, useState, useRef } from 'react'
import styles from '../styles/modal.module.css'

export const ContactModal = ({
  active,
  onClose,
  token,
  id,
  getContacts,
  handleUpdate,
  handleCreate
}) => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const modalRef = useRef(null)

  useEffect(() => {
    if (active) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
      cleanFormData()
    }
  }, [active])

  useEffect(() => {
    const fetchContact = async () => {
      const data = await getContacts(id)
      console.log(data)
      setFirstName(data.first_name)
      setMiddleName(data.middle_name)
      setLastName(data.last_name)
      setEmail(data.email)
      setPhone(data.phone)
    }

    if (id) {
      fetchContact().then()
    }
  }, [id, token])

  const cleanFormData = () => {
    setFirstName('')
    setMiddleName('')
    setLastName('')
    setEmail('')
    setPhone('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const contact = {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      id
    }

    if (id) {
      await handleUpdate(contact)
    } else {
      await handleCreate(contact)
    }

    cleanFormData()
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

        <form onSubmit={handleSubmit}>
          <section className={styles.modalForm}>
            <input
              type="text"
              placeholder="Фамилия"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Отчество"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              pattern="^\+?[0-9]{7,15}$"
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
