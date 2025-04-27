import { createContext, useState, useContext, useEffect } from 'react'
import {api} from '../api/axiosApi'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"))

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await api.get("/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          }
        })

        localStorage.setItem("token", token)
      } catch (err) {
        setToken(null)
        localStorage.removeItem("token")
      }
    }

    fetchUser()
  }, [token])

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {props.children}
    </AuthContext.Provider>
  );
}
