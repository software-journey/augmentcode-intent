import { useEffect, useMemo, useState } from 'react'

import { DelayedSummaryCard } from '../components/DelayedSummaryCard'
import { ShipmentDetailPanel } from '../components/ShipmentDetailPanel'
import { ShipmentList } from '../components/ShipmentList'
import { StatusFilter } from '../components/StatusFilter'
import { AppShell } from '../components/layout/AppShell'
import { useSession } from '../hooks/useSession'
import { useShipments } from '../hooks/useShipments'
import { countDelayedShipments, filterShipments, type ShipmentFilter } from '../lib/filters'

export function DashboardPage() {
  const session = useSession()
  const { data = [], isLoading, isError, refetch } = useShipments(session.accessToken)
  const [filter, setFilter] = useState<ShipmentFilter>('all')
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null)

  const delayedCount = useMemo(() => countDelayedShipments(data), [data])
  const visibleShipments = useMemo(() => filterShipments(data, filter), [data, filter])
  const selectedShipment = useMemo(
    () => visibleShipments.find((shipment) => shipment.id === selectedShipmentId) ?? null,
    [selectedShipmentId, visibleShipments],
  )

  useEffect(() => {
    if (selectedShipmentId && !selectedShipment) {
      setSelectedShipmentId(null)
    }
  }, [selectedShipment, selectedShipmentId])

  if (session.status !== 'authenticated' || !session.user) {
    return null
  }

  return (
    <AppShell user={session.user} onLogout={session.logout}>
      <section className="summary-grid" aria-label="Delivery summary">
        <DelayedSummaryCard delayedCount={delayedCount} />
        <section className="summary-card summary-card--secondary">
          <p className="eyebrow">Visible shipments</p>
          <h2>{isLoading ? '…' : visibleShipments.length}</h2>
          <p>
            {filter === 'all'
              ? 'All shipments returned by the authenticated API view.'
              : 'Only delayed shipments after applying the focused operator filter.'}
          </p>
        </section>
      </section>

      <section className="controls-panel">
        <div>
          <h2>Operator focus</h2>
          <p>Filter the authenticated shipment feed without losing the detail-review workflow.</p>
        </div>
        <StatusFilter value={filter} onChange={setFilter} />
      </section>

      {isError ? (
        <section className="panel panel-message">
          <h3>Shipment data is unavailable.</h3>
          <p>Retry the request once the backend is available again.</p>
          <button className="primary-button" type="button" onClick={() => void refetch()}>
            Retry
          </button>
        </section>
      ) : (
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
      )}
    </AppShell>
  )
}