import { act } from 'react'

import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, it, vi } from 'vitest'

import App from './App'
import type { Shipment } from './types'

describe('App', () => {
  it('shows the delayed summary and filters the visible list', () => {
    render(<App initialLoading={false} />)

    expect(screen.getByText(/2 delayed deliveries need immediate attention/i)).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)

    fireEvent.click(screen.getByRole('button', { name: /delayed only/i }))

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('ATL → NYC')).toBeInTheDocument()
    expect(screen.queryByText('SEA → DEN')).not.toBeInTheDocument()
  })

  it('opens shipment details and allows the panel to be dismissed', () => {
    render(<App initialLoading={false} />)

    fireEvent.click(screen.getAllByRole('button', { name: /view details/i })[0])

    const panel = screen.getByLabelText('Shipment detail panel')

    expect(within(panel).getByText('ATL → NYC')).toBeInTheDocument()
    expect(within(panel).getByText('42 minutes')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /close details/i }))

    expect(screen.getByText(/Select a shipment/i)).toBeInTheDocument()
  })

  it('shows a loading state before the list becomes visible', () => {
    vi.useFakeTimers()

    render(<App initialLoading />)

    expect(screen.getByRole('status')).toHaveTextContent(/loading delivery data/i)

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)

    vi.useRealTimers()
  })

  it('shows an empty state when the delayed filter has no matches', () => {
    const onTimeOnly: Shipment[] = [
      {
        id: 'ship-5',
        route: 'BOS → PHL',
        destination: 'Philadelphia, PA',
        courier: 'Atlantic Road',
        etaWindow: 'Due 13:15',
        status: 'on-time',
        delayMinutes: 0,
      },
    ]

    render(<App initialShipments={onTimeOnly} initialLoading={false} />)

    fireEvent.click(screen.getByRole('button', { name: /delayed only/i }))

    expect(screen.getByText(/No delayed deliveries match the current view/i)).toBeInTheDocument()
  })

  it('clears the detail panel when the selected shipment is filtered out', () => {
    render(<App initialLoading={false} />)

    fireEvent.click(screen.getAllByRole('button', { name: /view details/i })[1])

    const panel = screen.getByLabelText('Shipment detail panel')
    expect(within(panel).getByText('SEA → DEN')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /delayed only/i }))

    expect(screen.getByText(/Select a shipment/i)).toBeInTheDocument()
    expect(screen.queryByLabelText('Shipment detail panel')).not.toBeInTheDocument()
  })
})