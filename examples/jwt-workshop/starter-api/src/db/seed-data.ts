import { hash } from 'bcryptjs'

import { prisma } from './client'

const userFixtures = [
  {
    email: 'ada@example.com',
    name: 'Ada Lovelace',
    password: 'workshop-pass',
  },
  {
    email: 'grace@example.com',
    name: 'Grace Hopper',
    password: 'navy-debugger',
  },
]

const shipmentFixtures = [
  {
    route: 'ATL → NYC',
    destination: 'New York, NY',
    courier: 'Express East',
    etaWindow: 'Due 10:15',
    status: 'DELAYED' as const,
    delayMinutes: 42,
    priorityNote: 'Escalate to operations lead if the route slips another 15 minutes.',
  },
  {
    route: 'SEA → DEN',
    destination: 'Denver, CO',
    courier: 'Mountain Parcel',
    etaWindow: 'Due 11:00',
    status: 'ON_TIME' as const,
    delayMinutes: 0,
    priorityNote: 'No intervention required.',
  },
  {
    route: 'LAX → PHX',
    destination: 'Phoenix, AZ',
    courier: 'Desert Freight',
    etaWindow: 'Due 11:45',
    status: 'DELAYED' as const,
    delayMinutes: 18,
    priorityNote: 'Customer success should be prepared for a revised ETA notice.',
  },
  {
    route: 'ORD → MSP',
    destination: 'Minneapolis, MN',
    courier: 'Northline Cargo',
    etaWindow: 'Due 12:30',
    status: 'AT_RISK' as const,
    delayMinutes: 7,
    priorityNote: 'Watch for carrier updates before promoting to delayed.',
  },
]

export async function resetDatabase(): Promise<void> {
  await prisma.refreshToken.deleteMany()
  await prisma.shipment.deleteMany()
  await prisma.user.deleteMany()

  const seededUsers = await Promise.all(
    userFixtures.map(async (user) => ({
      email: user.email,
      name: user.name,
      passwordHash: await hash(user.password, 10),
    })),
  )

  await prisma.user.createMany({ data: seededUsers })
  await prisma.shipment.createMany({ data: shipmentFixtures })
}