import React, { useState } from 'react'

export const ContactsTable = ({ categories, groups, contacts, onUpdate, onDelete }) => {
  const [sortBy, setSortBy] = useState('date_updated')
  const [sortOrder, setSortOrder] = useState('desc')

  const sortedContacts = [...contacts].sort((a, b) => {
    const fieldA = a[sortBy]?.toString() || ''
    const fieldB = b[sortBy]?.toString() || ''

    if (sortOrder === 'asc') {
      return fieldA.localeCompare(fieldB, 'ru') // 'ru' — для кириллицы
    } else {
      return fieldB.localeCompare(fieldA, 'ru')
    }
  })

  return (
    <div>
      <table className="striped">
        <thead>
          <tr>
            {Object.entries(categories).map(
              ([name, key]) =>
                key.visible && (
                  <th key={name}>
                    <button
                      onClick={() => {
                        if (sortBy === name) {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                        } else {
                          setSortBy(name)
                          setSortOrder('asc')
                        }
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        padding: '10px'
                      }}
                    >
                      {key.label}
                      <span
                        style={{
                          visibility: sortBy === name ? 'visible' : 'hidden',
                          marginLeft: 4
                        }}
                      >
                        {sortOrder === 'asc' ? '▲' : '▼'}
                      </span>
                    </button>
                  </th>
                )
            )}
            <th style={{ textAlign: 'right' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {sortedContacts.map((contact) => (
            <tr key={contact.id}>
              {categories.group.visible && (
                <td className="table-cell-truncate" title={contact.group_id}>
                  {groups.find((g) => g.id === contact.group_id)?.name || '—'}
                </td>
              )}
              {categories.middle_name.visible && (
                <td className="table-cell-truncate" title={contact.middle_name}>
                  {contact.middle_name}
                </td>
              )}
              {categories.first_name.visible && (
                <td className="table-cell-truncate" title={contact.first_name}>
                  {contact.first_name}
                </td>
              )}
              {categories.last_name.visible && (
                <td className="table-cell-truncate" title={contact.last_name}>
                  {contact.last_name}
                </td>
              )}
              {categories.email.visible && (
                <td className="table-cell-truncate" title={contact.email}>
                  {contact.email}
                </td>
              )}
              {categories.phone.visible && (
                <td className="table-cell-truncate" title={contact.phone}>
                  {contact.phone}
                </td>
              )}
              {categories.date_updated.visible && (
                <td>{new Date(contact.date_updated).toLocaleString()}</td>
              )}
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'right' }}>
                  <button className="secondary" onClick={() => onUpdate(contact.id)}>
                    ✏️
                  </button>
                  <button
                    className="outline"
                    style={{ color: 'crimson' }}
                    onClick={() => onDelete(contact.id)}
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
  )
}
