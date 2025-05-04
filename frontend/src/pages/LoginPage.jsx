import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/axiosApi'

export const LoginPage = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [, setToken] = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)

      const formData = new URLSearchParams()
      formData.append('username', login)
      formData.append('password', password)

      const response = await api.post('/token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })

      setToken(response.data.access_token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container card">
      <article>
        <h1>Вход</h1>

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

          <button type="submit" className="contrast" aria-busy={loading}>
            Войти
          </button>
        </form>
      </article>
    </main>
  )
}
