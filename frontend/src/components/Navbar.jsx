import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import React from "react";

export const Navbar = () => {
  const [token, setToken] = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    setToken(null)
    navigate('/')
  };

  return (
    <header className="container">
      <nav
        style={{
          backgroundColor: "#181e29", // светло-серый фон
          padding: "1rem 1.5rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "1rem"
        }}
      >
        {/* Лого и название */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src="/vite.svg"
            alt="Notebook Logo"
            style={{ width: "30px", height: "30px" }}
          />
          <strong>
            <Link to="/" className="contrast" style={{ textDecoration: "none" }}>
              Контактник
            </Link>
          </strong>
        </div>

        {/* Навигационные ссылки */}
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none", margin: 0 }}>
          {token ? (
            <>
              <li><Link to="/notes" className="secondary">Notes</Link></li>
              <li><Link to="/profile" className="secondary">Profile</Link></li>
              <li>
                <button className="contrast" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="secondary">Login</Link></li>
              <li><Link to="/register" className="secondary">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
