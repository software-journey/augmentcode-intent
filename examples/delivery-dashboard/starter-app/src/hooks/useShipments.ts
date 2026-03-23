import { useQuery } from '@tanstack/react-query'

import { fetchShipments } from '../api/shipments'

export function useShipments(accessToken: string | null) {
  return useQuery({
    queryKey: ['shipments'],
    queryFn: () => fetchShipments(accessToken ?? ''),
    enabled: Boolean(accessToken),
    retry: false,
  })
}