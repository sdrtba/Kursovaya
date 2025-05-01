import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { api } from "../api/axiosApi"


export const LoginPage = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
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

      const response = await api.post("/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
    <main
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <article
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#181e29",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Sign in</h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <p style={{ color: "crimson", marginBottom: "1rem" }}>{error}</p>
          )}

          <label>
            Login
            <input
              type="text"
              name="login"
              placeholder="Enter your login"
              autoComplete="username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              maxLength={255}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={255}
              required
            />
          </label>

          <button
            type="submit"
            className="contrast"
            aria-busy={loading}
            style={{ width: "100%", marginTop: "1rem" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </article>
    </main>
  )
}