import { Navigate, useLocation } from 'react-router-dom'

/** Permanent move of an old URL; keeps the query string and hash. */
export default function LegacyRedirect({ to }) {
  const { search, hash } = useLocation()
  return <Navigate to={`${to}${search}${hash}`} replace />
}
