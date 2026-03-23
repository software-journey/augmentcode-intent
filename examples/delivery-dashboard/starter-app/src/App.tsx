import { useEffect, useMemo, useState } from 'react'

import './App.css'

import { DelayedSummaryCard } from './components/DelayedSummaryCard'
import { ShipmentDetailPanel } from './components/ShipmentDetailPanel'
import { ShipmentList } from './components/ShipmentList'
import { StatusFilter } from './components/StatusFilter'
import { shipmentFixtures } from './data/shipments'
import { countDelayedShipments, filterShipments, type ShipmentFilter } from './lib/filters'
import type { Shipment } from './types'

type AppProps = {
  initialShipments?: Shipment[]
  initialLoading?: boolean
}

function App({
  initialShipments = shipmentFixtures,
  initialLoading = true,
}: AppProps) {
  const [filter, setFilter] = useState<ShipmentFilter>('all')
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null)

  useEffect(() => {
    if (!initialLoading) {
      return
    }

    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => {
      window.clearTimeout(timer)
    }
  }, [initialLoading])

  const delayedCount = useMemo(
    () => countDelayedShipments(initialShipments),
    [initialShipments],
  )

  const visibleShipments = useMemo(
    () => filterShipments(initialShipments, filter),
    [initialShipments, filter],
  )

  const selectedShipment = useMemo(
    () => visibleShipments.find((shipment) => shipment.id === selectedShipmentId) ?? null,
    [selectedShipmentId, visibleShipments],
  )

  useEffect(() => {
    if (selectedShipmentId && !selectedShipment) {
      setSelectedShipmentId(null)
    }
  }, [selectedShipment, selectedShipmentId])

  return (
    <main className="dashboard-shell">
      <header className="hero-panel">
        <p className="eyebrow">Wave 4 starter app</p>
        <h1>Delayed deliveries dashboard</h1>
        <p className="hero-copy">
          This small React slice turns the delivery-dashboard spec into a concrete
          learner-friendly example with fixture data, filtering, explicit UI states,
          and a focused shipment-detail follow-up.
        </p>
      </header>

      <section className="summary-grid" aria-label="Delivery summary">
        <DelayedSummaryCard delayedCount={delayedCount} />
        <section className="summary-card summary-card--secondary">
          <p className="eyebrow">Visible shipments</p>
          <h2>{isLoading ? '…' : visibleShipments.length}</h2>
          <p>
            {filter === 'all'
              ? 'All fixture shipments in the current training view.'
              : 'Only delayed shipments after applying the focused filter.'}
          </p>
        </section>
      </section>

      <section className="controls-panel">
        <div>
          <h2>Operator focus</h2>
          <p>Switch between the full shipment set and the delayed-only training view.</p>
        </div>
        <StatusFilter value={filter} onChange={setFilter} />
      </section>

      <section className="content-grid">
        <ShipmentList
          shipments={visibleShipments}
          isLoading={isLoading}
          selectedShipmentId={selectedShipmentId}
          onSelect={setSelectedShipmentId}
        />
        <ShipmentDetailPanel
          shipment={selectedShipment}
          isLoading={isLoading}
          onClose={() => setSelectedShipmentId(null)}
        />
      </section>
    </main>
  )
}

export default App