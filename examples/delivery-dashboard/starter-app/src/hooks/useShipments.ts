import { useQuery } from '@tanstack/react-query'

import { fetchShipments } from '../api/shipments'
import type { Shipment } from '../types'

export function useShipments(accessToken: string | null, filter?: Shipment['status']) {
  return useQuery({
    queryKey: ['shipments', filter ?? 'all'],
    queryFn: () => fetchShipments(accessToken ?? '', filter),
    enabled: Boolean(accessToken),
    retry: false,
  })
}