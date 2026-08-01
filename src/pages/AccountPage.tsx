import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/ProductCard'
import { useAuth } from '../context/AuthContext'
import { usePreferences } from '../context/PreferencesContext'
import { formatMoney } from '../utils/money'
import { useToast } from '../components/Toast'

export function AccountPage() {
  const { user, login, register, logout, orders } = useAuth()
  const { currency, t } = usePreferences()
  const toast = useToast()
  const [tab, setTab] = useState<'login' | 'register'>('login')

  function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const res = login(String(fd.get('email')), String(fd.get('password')))
    toast(res.message)
  }

  function onRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const res = register(String(fd.get('name')), String(fd.get('email')), String(fd.get('password')))
    toast(res.message)
  }

  if (!user) {
    return (
      <>
        <PageHero title={t('account')} eyebrow="Account" pigment="cumin" />
        <div className="container" style={{ paddingBottom: '4rem', maxWidth: 520 }}>
          <div className="tabs">
            <button type="button" className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>
              {t('login')}
            </button>
            <button
              type="button"
              className={tab === 'register' ? 'active' : ''}
              onClick={() => setTab('register')}
            >
              {t('register')}
            </button>
          </div>
          {tab === 'login' ? (
            <form className="form-panel" onSubmit={onLogin}>
              <p className="admin-note">Demo: buyer@spicewala.com / spice123</p>
              <div className="field">
                <label>Email</label>
                <input name="email" type="email" required />
              </div>
              <div className="field">
                <label>Password</label>
                <input name="password" type="password" required />
              </div>
              <button type="submit" className="btn">
                {t('login')}
              </button>
            </form>
          ) : (
            <form className="form-panel" onSubmit={onRegister}>
              <div className="field">
                <label>Name</label>
                <input name="name" required />
              </div>
              <div className="field">
                <label>Email</label>
                <input name="email" type="email" required />
              </div>
              <div className="field">
                <label>Password</label>
                <input name="password" type="password" required />
              </div>
              <button type="submit" className="btn">
                Create account
              </button>
            </form>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <PageHero
        title={`Hello, ${user.name}`}
        eyebrow={t('account')}
        subtitle={user.email}
        pigment="cumin"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link to="/wishlist" className="btn btn-ghost btn-sm">
            Wishlist
          </Link>
          <Link to="/track-order" className="btn btn-ghost btn-sm">
            Track order
          </Link>
          <button type="button" className="btn btn-chili btn-sm" onClick={logout}>
            {t('logout')}
          </button>
        </div>
        <h2>Order history</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="form-panel">
            {orders.map((o) => (
              <div
                key={o.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr auto',
                  gap: '1rem',
                  padding: '0.85rem 0',
                  borderBottom: '1px solid var(--line-soft)',
                }}
              >
                <div>
                  <div className="mono">{o.id}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>{o.date}</div>
                </div>
                <div>{o.status}</div>
                <div className="mono">{formatMoney(o.totalInr, currency)}</div>
                <Link to={`/track-order?id=${o.id}`} className="btn btn-ghost btn-sm">
                  Track
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
