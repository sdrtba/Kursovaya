import {useState, useEffect} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";
import {api} from "../api/axiosApi.js"
import { ContactModal } from "../components/ContactModal"

export const NotesPage = () => {
  const [token, ] = useAuth()
  const [status, setStatus] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [contacts, setContacts] = useState([])
  const [active, setActive] = useState(false)
  const [id, setId] = useState(null)

  const openModal = () => setActive(true)
  const closeModal = () => setActive(false)

  const handleUpdate = async (id) => {
    setId(id)
    openModal()
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contacts/${id}/?contact_id=${id}`, {
        headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      })

      await getContacts()
    } catch (err) {
      setStatus("Failed: delete")
    }
  }

  const getContacts = async ()  => {
    try {
      const response = await api.get("/contacts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })

      setContacts(response.data)
      setLoaded(true)
    } catch (err) {
      setStatus(err.response?.data?.detail || "Something went wrong in update")
    }
  }

  useEffect(() => {
    getContacts()
  }, []);

  return (
    <div className="container">
      <ContactModal active={active} onClose={closeModal} token={token} id={id} getContacts={getContacts} />
      <h1>Notes Page</h1>
      <button onClick={openModal}>Create Contact</button>
      <p>{status}</p>
      { loaded && contacts ? (
        <table className="table is-fullwidth">
          <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          { contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.first_name}</td>
              <td>{contact.middle_name}</td>
              <td>{contact.last_name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.date_updated}</td>
              <td>
                <button onClick={() => handleUpdate(contact.id)}>Update</button>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      ): <p>Loading</p>}
    </div>
  )
}
