import { createStore } from "zustand";


export type AuthState = {
  user: any
}

export type AuthActions = {
  setUser: () => void
}

export type AuthStore = AuthState & AuthActions

export const initAuthStore = (): AuthState => {
  return {user: {}}
}

export const defaultInitState: AuthState = {
  user: {}
}

export const createAuthStore = ( initState: AuthState = defaultInitState ) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setUser: () => set((state) => ({user:state.user}))
  }))
}