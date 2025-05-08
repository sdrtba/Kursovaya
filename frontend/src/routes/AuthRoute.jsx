import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/UseAuth'

export const AuthRouter = () => {
  const [token] = useAuth()

  if (token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
