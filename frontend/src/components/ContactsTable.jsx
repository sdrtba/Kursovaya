import { useState } from 'react'

export const ContactsTable = ({ contacts, onUpdate, onDelete }) => {
  const [sortBy, setSortBy] = useState('date_updated')
  const [sortOrder, setSortOrder] = useState('desc')
  const [search, setSearch] = useState('')

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
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Поиск по имени или почте"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>

      <table className="striped">
        <thead>
          <tr>
            {[
              { key: 'last_name', label: 'Фамилия' },
              { key: 'first_name', label: 'Имя' },
              { key: 'middle_name', label: 'Отчество' },
              { key: 'email', label: 'Почта' },
              { key: 'phone', label: 'Телефон' },
              { key: 'date_updated', label: 'Дата обновления' }
            ].map(({ key, label }) => (
              <th key={key}>
                <button
                  onClick={() => {
                    if (sortBy === key) {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                    } else {
                      setSortBy(key)
                      setSortOrder('asc')
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {label}
                  <span
                    style={{ visibility: sortBy === key ? 'visible' : 'hidden', marginLeft: 4 }}
                  >
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                </button>
              </th>
            ))}
            <th style={{ textAlign: 'left' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {sortedContacts.map((contact) => (
            <tr key={contact.id}>
              <td className="table-cell-truncate" title={contact.middle_name}>
                {contact.middle_name}
              </td>
              <td className="table-cell-truncate" title={contact.first_name}>
                {contact.first_name}
              </td>
              <td className="table-cell-truncate" title={contact.last_name}>
                {contact.last_name}
              </td>
              <td className="table-cell-truncate" title={contact.email}>
                {contact.email}
              </td>
              <td className="table-cell-truncate" title={contact.phone}>
                {contact.phone}
              </td>
              <td>{new Date(contact.date_updated).toLocaleString()}</td>
              <td style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
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
