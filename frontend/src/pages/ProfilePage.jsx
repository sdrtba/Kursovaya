import {Link} from "react-router-dom"
import {useAuth} from "../contexts/AuthContext.jsx";
import {api} from "../api/axiosApi.js";
import React, {useContext, useState} from "react";

export const ProfilePage = () => {
  const [token, ] = useAuth()
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      await api.post("change-password", {
        old_password: oldPassword,
        new_password: newPassword,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })

      setStatus("Password Updated")
    } catch (err) {
      setStatus("Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Update Password</h1>
      <form onSubmit={handlePasswordUpdate}>
        <p>{status}</p>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          aria-label="Password"
          autoComplete="current-password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          maxLength={255}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          aria-label="Password"
          autoComplete="current-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          maxLength={255}
          required
        />
        <button type="submit" aria-busy={loading}>
          Change Password
        </button>
        </form>
    </div>
  )
}
