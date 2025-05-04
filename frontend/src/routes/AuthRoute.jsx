import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const AuthRouter = () => {
  const [token] = useAuth()

  if (token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
