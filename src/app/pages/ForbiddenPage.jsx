import { Link } from 'react-router-dom'
import { useApp } from '@app/providers'
import { getHomePath } from '@app/router/navigation'

/** Shown in place of a page the user has no permission for (URL is kept). */
export default function ForbiddenPage() {
  const { t, can } = useApp()

  return (
    <div className="panel status-page">
      <span className="status-code">403</span>
      <h1>{t('forbiddenTitle')}</h1>
      <p className="muted">{t('forbiddenText')}</p>
      <Link className="btn primary" to={getHomePath(can)}>
        {t('backHome')}
      </Link>
    </div>
  )
}
