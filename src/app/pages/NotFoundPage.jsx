import { Link } from 'react-router-dom'
import { useApp } from '@app/providers'
import { getHomePath } from '@app/router/navigation'

export default function NotFoundPage() {
  const { t, can } = useApp()

  return (
    <div className="panel status-page">
      <span className="status-code">404</span>
      <h1>{t('notFoundTitle')}</h1>
      <p className="muted">{t('notFoundText')}</p>
      <Link className="btn primary" to={getHomePath(can)}>
        {t('backHome')}
      </Link>
    </div>
  )
}
