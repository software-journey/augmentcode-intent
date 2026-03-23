import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from './App'
import { AuthProvider } from './auth/AuthProvider'

const shipments = [
  {
    id: 'ship-1',
    route: 'ATL → NYC',
    destination: 'New York, NY',
    courier: 'Express East',
    etaWindow: 'Due 10:15',
    status: 'delayed' as const,
    delayMinutes: 42,
    priorityNote: 'Escalate to operations lead if the route slips another 15 minutes.',
  },
  {
    id: 'ship-2',
    route: 'SEA → DEN',
    destination: 'Denver, CO',
    courier: 'Mountain Parcel',
    etaWindow: 'Due 11:00',
    status: 'on-time' as const,
    delayMinutes: 0,
    priorityNote: 'No intervention required.',
  },
]

function renderApp(initialEntries = ['/']) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function mockApi(handler: (url: string) => Response) {
  vi.mocked(globalThis.fetch).mockImplementation(async (input) => handler(String(input)))
}

describe('Wave 6 dashboard routing', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('redirects unauthenticated users to the login page', async () => {
    mockApi((url) => {
      if (url.endsWith('/auth/refresh')) {
        return jsonResponse({ error: 'Refresh token is missing.' }, 401)
      }

      return jsonResponse({ error: 'Unhandled request.' }, 500)
    })

    renderApp(['/'])

    expect(await screen.findByRole('heading', { name: /sign in to the dashboard/i })).toBeInTheDocument()
  })

  it('logs in, filters with URL-driven state, and loads detail on a routed shipment view', async () => {
    mockApi((url) => {
      if (url.endsWith('/auth/refresh')) {
        return jsonResponse({ error: 'Refresh token is missing.' }, 401)
      }

      if (url.endsWith('/auth/login')) {
        return jsonResponse({
          accessToken: 'wave-6-token',
          tokenType: 'Bearer',
          expiresIn: '15m',
          user: { id: 'user-1', email: 'ada@example.com', name: 'Ada Lovelace' },
        })
      }

      if (url.includes('/shipments?status=delayed')) {
        return jsonResponse({ shipments: shipments.filter((shipment) => shipment.status === 'delayed') })
      }

      if (url.endsWith('/shipments/ship-1')) {
        return jsonResponse({ shipment: shipments[0] })
      }

      if (url.endsWith('/shipments')) {
        return jsonResponse({ shipments })
      }

      return jsonResponse({ error: 'Unhandled request.' }, 500)
    })

    renderApp(['/login'])

    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }))

    expect(await screen.findByText(/Logged in as Ada Lovelace/i)).toBeInTheDocument()
    expect(await screen.findByText(/1 delayed delivery needs immediate attention/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /delayed only/i }))
    expect(await screen.findByText(/Only delayed shipments returned by the server-side filter/i)).toBeInTheDocument()
    expect(screen.queryByText('SEA → DEN')).not.toBeInTheDocument()
    expect(await screen.findByRole('button', { name: /view details/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /view details/i }))

    const panel = await screen.findByLabelText('Shipment detail panel')
    expect(within(panel).getByText('ATL → NYC')).toBeInTheDocument()
    expect(within(panel).getByText(/Escalate to operations lead/i)).toBeInTheDocument()
  })

  it('supports opening a shipment detail route directly after session restore', async () => {
    mockApi((url) => {
      if (url.endsWith('/auth/refresh')) {
        return jsonResponse({
          accessToken: 'wave-6-token',
          tokenType: 'Bearer',
          expiresIn: '15m',
          user: { id: 'user-2', email: 'grace@example.com', name: 'Grace Hopper' },
        })
      }

      if (url.includes('/shipments?status=delayed')) {
        return jsonResponse({ shipments: [shipments[0]] })
      }

      if (url.endsWith('/shipments/ship-1')) {
        return jsonResponse({ shipment: shipments[0] })
      }

      return jsonResponse({ error: 'Unhandled request.' }, 500)
    })

    renderApp(['/shipments/ship-1?filter=delayed'])

    expect(await screen.findByText(/Logged in as Grace Hopper/i)).toBeInTheDocument()
    expect(await screen.findByText(/1 delayed delivery needs immediate attention/i)).toBeInTheDocument()

    const panel = await screen.findByLabelText('Shipment detail panel')
    expect(within(panel).getByText('ATL → NYC')).toBeInTheDocument()
  })

  it('returns the user to login with a session-expired notice when the shipment request gets a 401', async () => {
    mockApi((url) => {
      if (url.endsWith('/auth/refresh')) {
        return jsonResponse({
          accessToken: 'wave-6-token',
          tokenType: 'Bearer',
          expiresIn: '15m',
          user: { id: 'user-1', email: 'ada@example.com', name: 'Ada Lovelace' },
        })
      }

      if (url.endsWith('/shipments')) {
        return jsonResponse({ error: 'Invalid refresh token.' }, 401)
      }

      return jsonResponse({ error: 'Unhandled request.' }, 500)
    })

    renderApp(['/'])

    expect(
      await screen.findByText(/Your session expired. Sign in again to continue reviewing shipments/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sign in to the dashboard/i })).toBeInTheDocument()
  })

  it('shows a not-found detail state for an unknown routed shipment', async () => {
    mockApi((url) => {
      if (url.endsWith('/auth/refresh')) {
        return jsonResponse({
          accessToken: 'wave-6-token',
          tokenType: 'Bearer',
          expiresIn: '15m',
          user: { id: 'user-1', email: 'ada@example.com', name: 'Ada Lovelace' },
        })
      }

      if (url.endsWith('/shipments')) {
        return jsonResponse({ shipments })
      }

      if (url.endsWith('/shipments/missing')) {
        return jsonResponse({ error: 'Shipment not found.' }, 404)
      }

      return jsonResponse({ error: 'Unhandled request.' }, 500)
    })

    renderApp(['/shipments/missing'])

    expect(await screen.findByText(/Shipment not found/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /return to list/i }))

    await waitFor(() => {
      expect(screen.getByText(/Select a shipment/i)).toBeInTheDocument()
    })
  })
})