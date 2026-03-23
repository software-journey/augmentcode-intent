import type { Shipment } from '../types'

type ShipmentDetailPanelProps = {
  shipment: Shipment | null
  isLoading: boolean
  onClose: () => void
}

function labelForStatus(status: Shipment['status']): string {
  if (status === 'on-time') {
    return 'On time'
  }

  if (status === 'at-risk') {
    return 'At risk'
  }

  return 'Delayed'
}

export function ShipmentDetailPanel({ shipment, isLoading, onClose }: ShipmentDetailPanelProps) {
  if (isLoading) {
    return (
      <aside className="panel detail-panel">
        <p className="eyebrow">Shipment detail</p>
        <p>Waiting for shipment data before a detail view can be opened.</p>
      </aside>
    )
  }

  if (!shipment) {
    return (
      <aside className="panel detail-panel">
        <p className="eyebrow">Shipment detail</p>
        <h3>Select a shipment</h3>
        <p>Choose a row from the shipment list to inspect status, timing, and courier details.</p>
      </aside>
    )
  }

  return (
    <aside className="panel detail-panel" aria-label="Shipment detail panel">
      <div className="detail-panel__header">
        <div>
          <p className="eyebrow">Shipment detail</p>
          <h3>{shipment.route}</h3>
        </div>
        <button className="detail-close" type="button" onClick={onClose}>
          Close details
        </button>
      </div>

      <dl className="detail-grid">
        <div>
          <dt>Destination</dt>
          <dd>{shipment.destination}</dd>
        </div>
        <div>
          <dt>Courier</dt>
          <dd>{shipment.courier}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{labelForStatus(shipment.status)}</dd>
        </div>
        <div>
          <dt>ETA window</dt>
          <dd>{shipment.etaWindow}</dd>
        </div>
        <div>
          <dt>Delay</dt>
          <dd>{shipment.delayMinutes} minutes</dd>
        </div>
      </dl>
    </aside>
  )
}