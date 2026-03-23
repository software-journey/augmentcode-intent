import { useEffect, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { ApiError } from '../api/client'
import { DelayedSummaryCard } from '../components/DelayedSummaryCard'
import { ShipmentDetailPanel } from '../components/ShipmentDetailPanel'
import { ShipmentList } from '../components/ShipmentList'
import { StatusFilter } from '../components/StatusFilter'
import { AppShell } from '../components/layout/AppShell'
import { useShipment } from '../hooks/useShipment'
import { useSession } from '../hooks/useSession'
import { useShipments } from '../hooks/useShipments'
import { countDelayedShipments, normalizeShipmentFilter } from '../lib/filters'

function toDashboardPath(filter: 'all' | 'delayed', shipmentId?: string) {
  const path = shipmentId ? `/shipments/${shipmentId}` : '/'
  return filter === 'delayed' ? `${path}?filter=delayed` : path
}

export function DashboardPage() {
  const session = useSession()
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = normalizeShipmentFilter(searchParams.get('filter'))
  const selectedShipmentId = params.shipmentId
  const apiFilter = filter === 'delayed' ? 'delayed' : undefined
  const shipmentsQuery = useShipments(session.accessToken, apiFilter)
  const shipmentDetailQuery = useShipment(session.accessToken, selectedShipmentId)
  const { data = [], isLoading, isError, error, refetch } = shipmentsQuery
  const selectedShipment = shipmentDetailQuery.data ?? null

  const delayedCount = useMemo(() => countDelayedShipments(data), [data])
  const selectedShipmentError = shipmentDetailQuery.error

  useEffect(() => {
    const authError = [error, selectedShipmentError].find(
      (candidate) => candidate instanceof ApiError && candidate.status === 401,
    )

    if (authError && session.status === 'authenticated') {
      session.expire('Your session expired. Sign in again to continue reviewing shipments.')
    }
  }, [error, selectedShipmentError, session])

  if (session.status !== 'authenticated' || !session.user) {
    return null
  }

  return (
    <AppShell user={session.user} onLogout={session.logout}>
      <section className="summary-grid" aria-label="Delivery summary">
        <DelayedSummaryCard delayedCount={delayedCount} />
        <section className="summary-card summary-card--secondary">
          <p className="eyebrow">Visible shipments</p>
          <h2>{isLoading ? '…' : data.length}</h2>
          <p>
            {filter === 'all'
              ? 'All shipments returned by the authenticated API view.'
              : 'Only delayed shipments returned by the server-side filter.'}
          </p>
        </section>
      </section>

      <section className="controls-panel">
        <div>
          <h2>Operator focus</h2>
          <p>Filter the authenticated shipment feed without losing the routed detail-review workflow.</p>
        </div>
        <StatusFilter
          value={filter}
          onChange={(nextFilter) => {
            const nextParams = new URLSearchParams(searchParams)

            if (nextFilter === 'delayed') {
              nextParams.set('filter', 'delayed')
            } else {
              nextParams.delete('filter')
            }

            setSearchParams(nextParams, { replace: true })
          }}
        />
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
            shipments={data}
            isLoading={isLoading}
            selectedShipmentId={selectedShipmentId ?? null}
            onSelect={(shipmentId) => navigate(toDashboardPath(filter, shipmentId))}
          />
          {shipmentDetailQuery.isError && selectedShipmentError instanceof ApiError && selectedShipmentError.status === 404 ? (
            <aside className="panel detail-panel">
              <p className="eyebrow">Shipment detail</p>
              <h3>Shipment not found</h3>
              <p>The requested shipment route is no longer available in the current local dataset.</p>
              <button className="detail-close" type="button" onClick={() => navigate(toDashboardPath(filter))}>
                Return to list
              </button>
            </aside>
          ) : shipmentDetailQuery.isError ? (
            <aside className="panel detail-panel">
              <p className="eyebrow">Shipment detail</p>
              <h3>Unable to load shipment detail</h3>
              <p>Retry after the backend responds again, or return to the shipment list.</p>
              <button className="detail-close" type="button" onClick={() => void shipmentDetailQuery.refetch()}>
                Retry detail
              </button>
            </aside>
          ) : (
            <ShipmentDetailPanel
              shipment={selectedShipment}
              isLoading={isLoading || shipmentDetailQuery.isLoading}
              onClose={() => navigate(toDashboardPath(filter))}
            />
          )}
        </section>
      )}
    </AppShell>
  )
}