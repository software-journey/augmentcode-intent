import type { Shipment } from '../types'

export const shipmentFixtures: Shipment[] = [
  {
    id: 'ship-1',
    route: 'ATL → NYC',
    destination: 'New York, NY',
    courier: 'Express East',
    etaWindow: 'Due 10:15',
    status: 'delayed',
    delayMinutes: 42,
  },
  {
    id: 'ship-2',
    route: 'SEA → DEN',
    destination: 'Denver, CO',
    courier: 'Mountain Parcel',
    etaWindow: 'Due 11:00',
    status: 'on-time',
    delayMinutes: 0,
  },
  {
    id: 'ship-3',
    route: 'LAX → PHX',
    destination: 'Phoenix, AZ',
    courier: 'Desert Freight',
    etaWindow: 'Due 11:45',
    status: 'delayed',
    delayMinutes: 18,
  },
  {
    id: 'ship-4',
    route: 'ORD → MSP',
    destination: 'Minneapolis, MN',
    courier: 'Northline Cargo',
    etaWindow: 'Due 12:30',
    status: 'at-risk',
    delayMinutes: 7,
  },
]