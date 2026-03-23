import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useSession } from '../hooks/useSession'

export function ProtectedRoute() {
  const session = useSession()
  const location = useLocation()

  if (session.status === 'loading') {
    return (
      <main className="centered-panel">
        <p role="status">Restoring your session…</p>
      </main>
    )
  }

  if (session.status === 'unauthenticated') {
    return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />
  }

  return <Outlet />
}