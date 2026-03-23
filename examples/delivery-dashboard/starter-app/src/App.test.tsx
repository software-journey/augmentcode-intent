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

describe('Wave 5 app shell', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('redirects unauthenticated users to the login page', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(jsonResponse({ error: 'Refresh token is missing.' }, 401))

    renderApp(['/'])

    expect(await screen.findByRole('heading', { name: /sign in to the dashboard/i })).toBeInTheDocument()
  })

  it('logs in, renders shipments, filters delayed rows, and shows shipment details', async () => {
    vi.mocked(globalThis.fetch)
      .mockResolvedValueOnce(jsonResponse({ error: 'Refresh token is missing.' }, 401))
      .mockResolvedValueOnce(
        jsonResponse({
          accessToken: 'wave-5-token',
          tokenType: 'Bearer',
          expiresIn: '15m',
          user: { id: 'user-1', email: 'ada@example.com', name: 'Ada Lovelace' },
        }),
      )
      .mockResolvedValueOnce(jsonResponse({ shipments }))

    renderApp(['/login'])

    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }))

    expect(await screen.findByText(/Logged in as Ada Lovelace/i)).toBeInTheDocument()
    expect(await screen.findByText(/1 delayed delivery needs immediate attention/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /delayed only/i }))
    expect(screen.queryByText('SEA → DEN')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /view details/i }))

    const panel = screen.getByLabelText('Shipment detail panel')
    expect(within(panel).getByText('ATL → NYC')).toBeInTheDocument()
    expect(within(panel).getByText(/Escalate to operations lead/i)).toBeInTheDocument()
  })

  it('restores a session from refresh and loads shipments on the protected route', async () => {
    vi.mocked(globalThis.fetch)
      .mockResolvedValueOnce(
        jsonResponse({
          accessToken: 'wave-5-token',
          tokenType: 'Bearer',
          expiresIn: '15m',
          user: { id: 'user-2', email: 'grace@example.com', name: 'Grace Hopper' },
        }),
      )
      .mockResolvedValueOnce(jsonResponse({ shipments }))

    renderApp(['/'])

    expect(await screen.findByText(/Logged in as Grace Hopper/i)).toBeInTheDocument()
    expect(await screen.findAllByRole('listitem')).toHaveLength(2)
  })

  it('shows an error state when the shipment request fails', async () => {
    vi.mocked(globalThis.fetch)
      .mockResolvedValueOnce(
        jsonResponse({
          accessToken: 'wave-5-token',
          tokenType: 'Bearer',
          expiresIn: '15m',
          user: { id: 'user-1', email: 'ada@example.com', name: 'Ada Lovelace' },
        }),
      )
      .mockResolvedValueOnce(jsonResponse({ error: 'Database unavailable.' }, 500))
      .mockResolvedValueOnce(jsonResponse({ shipments }))

    renderApp(['/'])

    expect(await screen.findByText(/Shipment data is unavailable/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /retry/i }))

    await waitFor(() => {
      expect(screen.getByText(/1 delayed delivery needs immediate attention/i)).toBeInTheDocument()
    })
  })
})