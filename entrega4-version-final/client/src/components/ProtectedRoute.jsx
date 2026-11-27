import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return (
      <main className="simple-page">
        <p role="status">Verificando sesión...</p>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}