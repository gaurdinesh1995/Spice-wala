import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { currencies, languages, type CurrencyCode, type LangCode } from '../data/pigments'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { usePreferences } from '../context/PreferencesContext'
import { useAuth } from '../context/AuthContext'
import { searchProducts } from '../data/catalog'

const nav = [
  { to: '/products', key: 'shop' },
  { to: '/categories', key: 'categories' },
  { to: '/export', key: 'export' },
  { to: '/private-label', key: 'privateLabel' },
  { to: '/bulk-orders', key: 'bulkOrders' },
  { to: '/distributor', key: 'distributor' },
  { to: '/certifications', key: 'certifications' },
  { to: '/blogs', key: 'blogs' },
  { to: '/gallery', key: 'gallery' },
  { to: '/about', key: 'about' },
  { to: '/contact', key: 'contact' },
  { to: '/faq', key: 'faq' },
]

export function Header() {
  const { t, currency, setCurrency, language, setLanguage } = usePreferences()
  const { count } = useCart()
  const { count: wishCount } = useWishlist()
  const { user } = useAuth()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const suggestions = useMemo(() => (q.trim().length > 1 ? searchProducts(q).slice(0, 5) : []), [q])

  function onSearch(e: FormEvent) {
    e.preventDefault()
    if (!q.trim()) return
    navigate(`/products?q=${encodeURIComponent(q.trim())}`)
    setQ('')
    setOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="top-bar">
          <div>
            <a href="tel:+919876543210">+91 98765 43210</a>
            <span style={{ margin: '0 0.6rem', opacity: 0.4 }}>|</span>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Trade Desk
            </a>
          </div>
          <div className="top-bar-actions">
            <label>
              <select
                className="select-inline"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                aria-label="Currency"
              >
                {(Object.keys(currencies) as CurrencyCode[]).map((c) => (
                  <option key={c} value={c}>
                    {currencies[c].flag} {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                className="select-inline"
                value={language}
                onChange={(e) => setLanguage(e.target.value as LangCode)}
                aria-label="Language"
              >
                {(Object.keys(languages) as LangCode[]).map((l) => (
                  <option key={l} value={l}>
                    {languages[l].native}
                  </option>
                ))}
              </select>
            </label>
            <Link to="/track-order">{t('trackOrder')}</Link>
          </div>
        </div>

        <div className="header-main">
          <Link to="/" className="logo" aria-label="SpiceWala home">
            <div className="logo-mark" aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="logo-text">
              SpiceWala
              <small>Spices as Pigment</small>
            </div>
          </Link>

          <form className="search-wrap" onSubmit={onSearch} role="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('searchPlaceholder')}
              aria-label="Search"
            />
            {suggestions.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--line)',
                  zIndex: 20,
                }}
              >
                {suggestions.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.slug}`}
                    onClick={() => setQ('')}
                    style={{
                      display: 'block',
                      padding: '0.65rem 1rem',
                      borderBottom: '1px solid var(--line-soft)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
          </form>

          <div className="header-actions">
            <Link to="/account" className="icon-btn" title={t('account')}>
              {user ? user.name.split(' ')[0] : t('login')}
            </Link>
            <Link to="/wishlist" className="icon-btn" aria-label={t('wishlist')}>
              ♡
              {wishCount > 0 && <span className="count">{wishCount}</span>}
            </Link>
            <Link to="/cart" className="icon-btn" aria-label={t('cart')}>
              Bag
              {count > 0 && <span className="count">{count}</span>}
            </Link>
            <button type="button" className="mobile-toggle" onClick={() => setOpen((v) => !v)}>
              Menu
            </button>
          </div>
        </div>

        <nav className={`nav-bar ${open ? 'open' : ''}`} aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  const { t } = usePreferences()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo-text" style={{ marginBottom: '0.75rem' }}>
              SpiceWala
              <small>Manufacturer · Exporter · OEM</small>
            </div>
            <p style={{ maxWidth: '36ch' }}>
              Indian spices graded like pigments — turmeric gold, chili brick, cardamom olive,
              saffron ember — for retail shelves and export containers alike.
            </p>
            <div className="pigment-row" aria-hidden>
              <span style={{ background: 'var(--pigment-turmeric)' }} />
              <span style={{ background: 'var(--pigment-chili)' }} />
              <span style={{ background: 'var(--pigment-cardamom)' }} />
              <span style={{ background: 'var(--pigment-saffron)' }} />
              <span style={{ background: 'var(--pigment-cumin)' }} />
              <span style={{ background: 'var(--pigment-coriander)' }} />
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <Link to="/products">{t('shop')}</Link>
            <Link to="/categories">{t('categories')}</Link>
            <Link to="/wishlist">{t('wishlist')}</Link>
            <Link to="/track-order">{t('trackOrder')}</Link>
          </div>
          <div>
            <h4>B2B</h4>
            <Link to="/export">{t('export')}</Link>
            <Link to="/private-label">{t('privateLabel')}</Link>
            <Link to="/bulk-orders">{t('bulkOrders')}</Link>
            <Link to="/distributor">{t('distributor')}</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/about">{t('about')}</Link>
            <Link to="/certifications">{t('certifications')}</Link>
            <Link to="/gallery">{t('gallery')}</Link>
            <Link to="/blogs">{t('blogs')}</Link>
            <Link to="/faq">{t('faq')}</Link>
            <Link to="/contact">{t('contact')}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SpiceWala Foods Pvt. Ltd.</span>
          <span>SSL · Secure Checkout · FSSAI · ISO 22000</span>
        </div>
      </div>
    </footer>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <a
        className="wa-float"
        href="https://wa.me/919876543210?text=Hi%20SpiceWala%2C%20I%20need%20a%20quote"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </>
  )
}
