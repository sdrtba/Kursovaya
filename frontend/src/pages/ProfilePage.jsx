import { useAuth } from '../contexts/AuthContext.jsx'
import { api } from '../api/axiosApi.js'
import React, { useState } from 'react'

export const ProfilePage = () => {
  const [token] = useAuth()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      await api.post(
        'change-password',
        {
          old_password: oldPassword,
          new_password: newPassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }
      )

      setStatus('Пароль обновлен')
    } catch (err) {
      setStatus('Ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container card">
      <article style={{}}>
        <h2>🔐 Обновить пароль</h2>

        <form onSubmit={handlePasswordUpdate}>
          {status && (
            <p
              style={{
                color: status && status.toLowerCase().includes('обновлен') ? 'green' : 'crimson'
              }}
            >
              {status}
            </p>
          )}

          <label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Текущий пароль"
              autoComplete="current-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </label>

          <label>
            <input
              type="password"
              name="newPassword"
              placeholder="Новый пароль"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="contrast" aria-busy={loading}>
            Обновить
          </button>
        </form>
      </article>
    </main>
  )
}
