import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { login as loginRequest, logout as logoutRequest, refreshSession } from '../api/auth'
import type { AuthResponse, LoginCredentials, SessionUser } from '../types'

type AuthState = {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  accessToken: string | null
  user: SessionUser | null
}

type AuthContextValue = AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function toAuthenticatedState(response: AuthResponse): AuthState {
  return {
    status: 'authenticated',
    accessToken: response.accessToken,
    user: response.user,
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AuthState>({
    status: 'loading',
    accessToken: null,
    user: null,
  })

  useEffect(() => {
    let active = true

    refreshSession()
      .then((response) => {
        if (active) {
          setState((currentState) =>
            currentState.status === 'authenticated'
              ? currentState
              : toAuthenticatedState(response),
          )
        }
      })
      .catch(() => {
        if (active) {
          setState((currentState) =>
            currentState.status === 'authenticated'
              ? currentState
              : { status: 'unauthenticated', accessToken: null, user: null },
          )
        }
      })

    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await loginRequest(credentials)
    setState(toAuthenticatedState(response))
  }, [])

  const logout = useCallback(async () => {
    await logoutRequest()
    setState({ status: 'unauthenticated', accessToken: null, user: null })
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [login, logout, state],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.')
  }

  return context
}