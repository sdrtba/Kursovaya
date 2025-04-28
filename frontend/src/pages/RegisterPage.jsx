import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../api/axiosApi"


export const RegisterPage = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [confirmationPassword, setConfirmationPassword] = useState("")
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

      if (password === confirmationPassword && password.length >= 3){
        const response = await api.post("/users", {login, password}, {
          headers: { "Content-Type": "application/json" },
        })
        setToken(response.data.access_token)
      } else {
        setError("Ensure that the passwords match and greater then 3")
        setIsPasswordError(true)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <input
          type="text"
          name="login"
          placeholder="Login"
          aria-label="Login"
          autoComplete="username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          maxLength={255}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={isPasswordError ? "true" : ""}
          maxLength={255}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
          aria-invalid={isPasswordError ? "true" : ""}
          maxLength={255}
          required
        />
        <button type="submit" aria-busy={loading}>
          Register
        </button>
      </form>
    </main>
  )
}