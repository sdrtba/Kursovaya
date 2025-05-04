import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../api/axiosApi'

export const RegisterPage = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [, setToken] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsPasswordError(false)
      setLoading(true)
      setError(null)

      if (password === confirmationPassword && password.length >= 3) {
        const response = await api.post(
          '/users',
          { login, password },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        setToken(response.data.access_token)
      } else {
        setError('Ensure that the passwords match and greater then 3')
        setIsPasswordError(true)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container card">
      <article>
        <h1>Создать аккаунт</h1>

        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}

          <label>
            <input
              type="text"
              name="login"
              placeholder="Логин"
              autoComplete="username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              maxLength={255}
              required
            />
          </label>

          <label>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={255}
              required
            />
          </label>

          <label>
            <input
              type="password"
              name="password"
              placeholder="Подтвердите пароль"
              autoComplete="current-password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              maxLength={255}
              required
            />
          </label>

          <button type="submit" className="contrast" aria-busy={loading}>
            Продолжить
          </button>
        </form>
      </article>
    </main>
  )
}
