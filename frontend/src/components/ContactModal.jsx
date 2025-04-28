import React, { useEffect, useState, useRef } from 'react'
import { api } from '../api/axiosApi.js'


export const ContactModal = ({active, onClose, token, id}) => {
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const modalRef = useRef(null)

  useEffect(() => {
    if (active) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [active])

  const cleanFormData = () => {
    setFirstName("")
    setMiddleName("")
    setLastName("")
    setEmail("")
    setPhone("")
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
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong")
    }
  }

  return (
    <dialog ref={modalRef} onClose={onClose}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={onClose}></button>
          <h3>{id ? "Update Lead" : "Create Lead"}</h3>
        </header>
        <section >
          <form>
            <div>
              {error && <p>{error}</p>}
              <div>
                <input type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
              </div>
              <div>
                <input type="text" placeholder="Enter middle name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} required/>
              </div>
              <div>
                <input type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
              </div>
              <div>
                <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div>
                <input type="text" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </div>
            </div>
          </form>
        </section>
        <footer>
          <button role="button" onClick={onClose}>Cancel</button>
          {id ? (
            <button className="button is-info" onClick={handleUpdateContact}>Update</button>
          ) : (
            <button className="button is-primary" onClick={handleCreateContact}>Create</button>
          )}
        </footer>
      </article>
    </dialog>
  )
}