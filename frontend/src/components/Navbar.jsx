import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const Navbar = () => {
  const [token, setToken] = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    setToken(null)
    navigate('/')
  };

  return (
    <div className="container">
      <nav >
      <ul>
        <li><strong><Link to={"/"} className={"contrast"}>Name</Link></strong></li>
      </ul>
      {token ? (
        <ul>
          <li><Link to={"/notes"} className={"secondary"}>Notes</Link></li>
          <li><Link to={"/profile"} className={"secondary"}>Profile</Link></li>
          <li>
            <button className="secondary" color={"red"} onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li><Link to={"/login"} className={"secondary"}>Login</Link></li>
          <li><Link to={"/register"} className={"secondary"}>Register</Link></li>
        </ul>
      )}
    </nav>
    </div>
  )
}
