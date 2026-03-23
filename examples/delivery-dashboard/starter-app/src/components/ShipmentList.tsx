import type { Shipment, ShipmentStatus } from '../types'

type ShipmentListProps = {
  shipments: Shipment[]
  isLoading: boolean
  selectedShipmentId: string | null
  onSelect: (shipmentId: string) => void
}

function labelForStatus(status: ShipmentStatus): string {
  if (status === 'on-time') {
    return 'On time'
  }

  if (status === 'at-risk') {
    return 'At risk'
  }

  return 'Delayed'
}

export function ShipmentList({
  shipments,
  isLoading,
  selectedShipmentId,
  onSelect,
}: ShipmentListProps) {
  if (isLoading) {
    return (
      <section className="panel panel-message" aria-live="polite">
        <p role="status">Loading delivery data…</p>
      </section>
    )
  }

  if (shipments.length === 0) {
    return (
      <section className="panel empty-state">
        <h3>No delayed deliveries match the current view.</h3>
        <p>Switch back to all shipments or add delayed fixture data for another pass.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <ul className="shipment-list" aria-label="Shipment list">
        {shipments.map((shipment) => (
          <li key={shipment.id} className="shipment">
            <button
              className="shipment-select"
              type="button"
              aria-pressed={selectedShipmentId === shipment.id}
              onClick={() => onSelect(shipment.id)}
            >
              <div>
                <h3>{shipment.route}</h3>
                <p>
                  {shipment.destination} · {shipment.courier}
                </p>
              </div>
              <div className="shipment-meta">
                <span className={`status-pill status-pill--${shipment.status}`}>
                  {labelForStatus(shipment.status)}
                </span>
                <span>{shipment.etaWindow}</span>
                <span className="shipment-action">View details</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}