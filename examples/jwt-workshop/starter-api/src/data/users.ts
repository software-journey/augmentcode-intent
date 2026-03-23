import type { PublicUser, StoredUser } from '../types'

const users: StoredUser[] = [
  {
    id: 'user-1',
    email: 'ada@example.com',
    name: 'Ada Lovelace',
    password: 'workshop-pass',
  },
  {
    id: 'user-2',
    email: 'grace@example.com',
    name: 'Grace Hopper',
    password: 'navy-debugger',
  },
]

export function toPublicUser(user: StoredUser): PublicUser {
  const { password: _password, ...publicUser } = user
  return publicUser
}

export function findUserByCredentials(email: string, password: string): StoredUser | undefined {
  return users.find((user) => user.email === email && user.password === password)
}

export function findPublicUserById(id: string): PublicUser | undefined {
  const user = users.find((candidate) => candidate.id === id)
  return user ? toPublicUser(user) : undefined
}