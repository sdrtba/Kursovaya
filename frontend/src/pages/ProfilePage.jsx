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
    <main
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          🔐 Update Password
        </h2>

        <form onSubmit={handlePasswordUpdate}>
          {status && (
            <p
              style={{
                color: status.toLowerCase().includes("success") ? "green" : "crimson",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {status}
            </p>
          )}

          <label>
            Current Password
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter current password"
              autoComplete="current-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </label>

          <label>
            New Password
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className="contrast"
            style={{ width: "100%", marginTop: "1rem" }}
            aria-busy={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </article>
    </main>
  )
}
