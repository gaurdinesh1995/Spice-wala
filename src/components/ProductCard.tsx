import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { pigments, type PigmentKey } from '../data/pigments'
import { salePriceInr, formatMoney } from '../utils/money'
import type { Product } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { usePreferences } from '../context/PreferencesContext'
import { useToast } from './Toast'

export function PigmentSwatch({
  pigment,
  className = '',
}: {
  pigment: PigmentKey
  className?: string
}) {
  return (
    <span
      className={`swatch ${className}`}
      style={{ background: pigments[pigment].hex }}
      title={pigments[pigment].name}
    />
  )
}

export function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return <span className="stars">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()
  const { currency, t } = usePreferences()
  const toast = useToast()
  const sale = salePriceInr(product)
  const wished = has(product.id)

  return (
    <article className="product-card">
      <Link to={`/products/${product.slug}`} className="product-card-media">
        <span className="product-card-swatch" style={{ background: pigments[product.pigment].hex }} />
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        {product.discountPercent > 0 && (
          <span className="badge badge-sale" style={{ position: 'absolute', left: 12, top: 12 }}>
            -{product.discountPercent}%
          </span>
        )}
      </Link>
      <button
        type="button"
        className={`wish-btn ${wished ? 'active' : ''}`}
        aria-label="Wishlist"
        onClick={() => {
          toggle(product.id)
          toast(wished ? 'Removed from wishlist' : 'Saved to wishlist')
        }}
      >
        {wished ? '♥' : '♡'}
      </button>
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="eyebrow" style={{ margin: 0 }}>
            <PigmentSwatch pigment={product.pigment} />
            {pigments[product.pigment].label}
          </span>
          <Stars rating={product.rating} />
        </div>
        <Link to={`/products/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="hindi">{product.hindiName}</div>
        <div className="price">
          {product.discountPercent > 0 && (
            <span className="price-old">{formatMoney(product.basePriceInr, currency)}</span>
          )}
          {formatMoney(sale, currency)}
          <span style={{ color: 'var(--ink-faint)', fontSize: '0.8em' }}> / 500g</span>
        </div>
        <div className="product-card-actions">
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              addItem(product, product.packSizes.find((p) => p.size === '500g')?.size ?? product.packSizes[0].size)
              toast('Added to cart')
            }}
          >
            {t('addToCart')}
          </button>
          <Link to={`/products/${product.slug}`} className="btn btn-ghost btn-sm">
            View
          </Link>
        </div>
      </div>
    </article>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <h3>No spices match</h3>
        <p>Try another filter or search term.</p>
      </div>
    )
  }
  return (
    <div className="grid-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  pigment,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  pigment?: PigmentKey
}) {
  return (
    <div className="page-hero">
      <div className="container">
        {eyebrow && (
          <div className="eyebrow fade-up">
            {pigment && <PigmentSwatch pigment={pigment} />}
            {eyebrow}
          </div>
        )}
        <h1 className="fade-up" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 8 }}>
          {title}
        </h1>
        {subtitle && <p className="fade-up-delay" style={{ maxWidth: '52ch', margin: 0 }}>{subtitle}</p>}
      </div>
    </div>
  )
}

export function SectionHead({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
