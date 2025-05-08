import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/UseAuth'

export const ProtectedRoute = () => {
  const [token] = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
