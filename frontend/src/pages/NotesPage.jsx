import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";
import {api} from "../api/axiosApi.js"
import { ContactModal } from "../components/ContactModal"

export const NotesPage = () => {
  const [contacts, setContacts] = useState([])
  const [active, setActive] = useState(false)
  const [token, ] = useAuth()
  const [id, setId] = useState(null)

  const openModal = () => setActive(true)
  const closeModal = () => setActive(false)


  return (
    <div className="container">
      <ContactModal active={active} onClose={closeModal} token={token} id={id} />
      <h1>Notes Page</h1>
      <button onClick={openModal}>Create Contact</button>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <h2>{contact.first_name}</h2>
          <p>{contact.last_name}</p>
        </div>
      ))}
      <h3>Heading 3</h3>
        <p>
          Integer bibendum malesuada libero vel eleifend. Fusce iaculis turpis ipsum, at efficitur
          sem scelerisque vel. Aliquam auctor diam ut purus cursus fringilla. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
      <Link to={"/"}>
        <button>Go Home</button>
      </Link>
    </div>
  )
}
