import React, { useEffect, useState, useRef } from 'react'
import { api } from '../api/axiosApi.js'


export const ContactModal = ({active, onClose, token, id, getContacts}) => {
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState("")
  const modalRef = useRef(null)

  useEffect(() => {
    if (active) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
      cleanFormData()
    }
  }, [active])

  const cleanFormData = () => {
    setFirstName("")
    setMiddleName("")
    setLastName("")
    setEmail("")
    setPhone("")
    setStatus("")
  }

  const handleCreateContact = async (e) => {
    e.preventDefault()
    try {
      await api.post("/contacts", {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email: email,
        phone: phone
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      })

      cleanFormData()
      setStatus("Contact created")
      getContacts()
    } catch (err) {
      setStatus("Something went wrong")
    }
  }

  const handleUpdateContact = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/contacts/${id}?contact_id=${id}`, {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email: email,
        phone: phone
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      })

      cleanFormData()
      setStatus("Contact updated")
      getContacts()
    } catch (err) {
      setStatus("Something went wrong in update")
    }
  }

  return (
    <dialog ref={modalRef} onClose={onClose} open>
  <article style={{ maxWidth: "500px" }}>
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h3 style={{ margin: 0 }}>{id ? "✏️ Update Contact" : "➕ Create Contact"}</h3>
      <button
        aria-label="Close"
        onClick={onClose}
        className="close"
        style={{ marginLeft: "auto" }}
      ></button>
    </header>

    <form onSubmit={id ? handleUpdateContact : handleCreateContact}>
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {status && (
          <p
            style={{
              color: status.toLowerCase().includes("success") ? "green" : "crimson",
              textAlign: "center",
            }}
          >
            {status}
          </p>
        )}

        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Middle name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </section>

      <footer style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
        <button type="button" onClick={onClose} className="secondary">
          Cancel
        </button>
        <button type="submit" className={id ? "contrast" : "primary"}>
          {id ? "Update" : "Create"}
        </button>
      </footer>
    </form>
  </article>
</dialog>
  )
}