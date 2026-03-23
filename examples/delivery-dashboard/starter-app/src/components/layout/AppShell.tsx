import type { PropsWithChildren } from 'react'

import type { SessionUser } from '../../types'

type AppShellProps = PropsWithChildren<{
  user: SessionUser
  onLogout: () => Promise<void>
}>

export function AppShell({ children, user, onLogout }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div>
          <p className="eyebrow">Wave 6 routed workflow · Wave 7 CI-ready</p>
          <h1>Delivery operations dashboard</h1>
          <p className="hero-copy">
            Logged in as {user.name}. The dashboard is now backed by authenticated API data.
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={() => void onLogout()}>
          Sign out
        </button>
      </header>
      {children}
    </div>
  )
}