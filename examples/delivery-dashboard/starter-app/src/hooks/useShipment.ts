import { useQuery } from '@tanstack/react-query'

import { fetchShipment } from '../api/shipments'

export function useShipment(accessToken: string | null, shipmentId: string | undefined) {
  return useQuery({
    queryKey: ['shipment', shipmentId ?? 'none'],
    queryFn: () => fetchShipment(accessToken ?? '', shipmentId ?? ''),
    enabled: Boolean(accessToken && shipmentId),
    retry: false,
  })
}