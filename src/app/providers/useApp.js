import { useContext } from 'react'
import { AppContext } from './app-context'

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp outside provider')
  return ctx
}
