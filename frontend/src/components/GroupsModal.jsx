import React, { useEffect, useState, useRef } from 'react'
import styles from '../styles/modal.module.css'

export const GroupsModal = ({ groups, isOpen, onClose, onCreate, onDelete }) => {
  const [name, setName] = useState('')
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    onCreate(name)
    setName('')
  }

  return (
    <dialog ref={modalRef} onClose={onClose} open>
      <article className={styles.modal}>
        <header className={styles.modalHeader}>
          <h3>Группы</h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="close"
            style={{ alignItems: 'center' }}
          ></button>
        </header>
        <table>
          {groups.map((group) => (
            <tr key={group.id}>
              <td className="table-cell-truncate" title={group.name}>
                {group.name}
              </td>
              <td>
                <button onClick={() => onDelete(group.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </table>
        <form className="container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Группа..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button>Добавить</button>
        </form>
      </article>
    </dialog>
  )
}
