export type PublicUser = {
  id: string
  email: string
  name: string
}

export type StoredUser = PublicUser & {
  password: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type RefreshRequest = {
  refreshToken: string
}

export type AccessTokenPayload = PublicUser