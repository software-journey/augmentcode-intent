import type { ShipmentFilter } from '../lib/filters'

type StatusFilterProps = {
  value: ShipmentFilter
  onChange: (filter: ShipmentFilter) => void
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="filter-group" aria-label="Shipment filters">
      <button
        className="filter-button"
        type="button"
        aria-pressed={value === 'all'}
        onClick={() => onChange('all')}
      >
        All shipments
      </button>
      <button
        className="filter-button"
        type="button"
        aria-pressed={value === 'delayed'}
        onClick={() => onChange('delayed')}
      >
        Delayed only
      </button>
    </div>
  )
}