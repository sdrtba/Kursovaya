export const ContactsTable = ({ contacts, onUpdate, onDelete }) => (
  <table className="striped">
    <thead>
      <tr>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Отчество</th>
        <th>Почта</th>
        <th>Телефон</th>
        <th>Дата обновления</th>
        <th style={{ textAlign: 'center' }}>Действия</th>
      </tr>
    </thead>
    <tbody>
      {contacts.map((contact) => (
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
)
