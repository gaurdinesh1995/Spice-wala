import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getProductBySlug,
  getRelatedProducts,
  reviews as allReviews,
} from '../data/catalog'
import { pigments } from '../data/pigments'
import { formatMoney, salePriceInr } from '../utils/money'
import { PageHero, PigmentSwatch, ProductGrid, Stars } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { usePreferences } from '../context/PreferencesContext'
import { useToast } from '../components/Toast'

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug ?? '')
  const { currency, t } = usePreferences()
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()
  const toast = useToast()
  const navigate = useNavigate()

  const [pack, setPack] = useState(product?.packSizes[2]?.size ?? product?.packSizes[0]?.size ?? '')
  const [qty, setQty] = useState(1)
  const [imgIdx, setImgIdx] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)

  const related = useMemo(() => (product ? getRelatedProducts(product) : []), [product])
  const reviews = useMemo(
    () => (product ? allReviews.filter((r) => r.productId === product.id) : []),
    [product],
  )

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="empty-state">
          <h3>Product not found</h3>
          <Link to="/products" className="btn">
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  const packMeta = product.packSizes.find((p) => p.size === pack) ?? product.packSizes[0]
  const unit = salePriceInr(product, packMeta.priceInr)

  return (
    <>
      <PageHero
        eyebrow={pigments[product.pigment].name}
        title={product.name}
        subtitle={product.hindiName}
        pigment={product.pigment}
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="pdp">
          <div className="pdp-gallery">
            <div
              className={`pdp-main-img ${zoomed ? 'zoomed' : ''}`}
              onClick={() => setZoomed((z) => !z)}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 8,
                  background: pigments[product.pigment].hex,
                  zIndex: 1,
                }}
              />
              <img src={product.images[imgIdx]} alt={product.name} />
            </div>
            <div className="pdp-thumbs">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={i === imgIdx ? 'active' : ''}
                  onClick={() => {
                    setImgIdx(i)
                    setShowVideo(false)
                  }}
                >
                  <img src={src} alt="" />
                </button>
              ))}
              {product.video && (
                <button type="button" onClick={() => setShowVideo(true)} className={showVideo ? 'active' : ''}>
                  ▶
                </button>
              )}
            </div>
            {showVideo && product.video && (
              <div className="video-frame" style={{ marginTop: '0.75rem' }}>
                <iframe title="Product video" src={product.video} allowFullScreen />
              </div>
            )}
            <p className="admin-note">Click image to zoom</p>
          </div>

          <div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {product.bestSeller && <span className="badge">Best seller</span>}
              {product.newArrival && <span className="badge">New</span>}
              {product.discountPercent > 0 && (
                <span className="badge badge-sale">-{product.discountPercent}%</span>
              )}
              <span className="badge">
                <PigmentSwatch pigment={product.pigment} /> {pigments[product.pigment].label}
              </span>
            </div>
            <Stars rating={product.rating} />{' '}
            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--ink-faint)' }}>
              {product.rating} · {product.reviewCount} reviews
            </span>
            <p style={{ marginTop: '1rem' }}>{product.longDescription}</p>

            <div className="price" style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
              {product.discountPercent > 0 && (
                <span className="price-old">{formatMoney(packMeta.priceInr, currency)}</span>
              )}
              {formatMoney(unit, currency)}
              <span style={{ fontSize: '0.85rem', color: 'var(--ink-faint)' }}> / {packMeta.size}</span>
            </div>

            <div className="eyebrow">Packaging size</div>
            <div className="pack-options">
              {product.packSizes.map((p) => (
                <button
                  key={p.size}
                  type="button"
                  className={pack === p.size ? 'active' : ''}
                  onClick={() => setPack(p.size)}
                >
                  {p.size}
                </button>
              ))}
            </div>

            <p className="mono" style={{ fontSize: '0.85rem' }}>
              Stock: {packMeta.stock} · MOQ: {product.moq} · Origin: {product.origin}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', margin: '1.25rem 0', flexWrap: 'wrap' }}>
              <div className="qty-ctrl">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)}>
                  +
                </button>
              </div>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  addItem(product, pack, qty)
                  toast('Added to cart')
                }}
              >
                {t('addToCart')}
              </button>
              <button
                type="button"
                className="btn btn-chili"
                onClick={() => {
                  addItem(product, pack, qty)
                  navigate('/checkout')
                }}
              >
                {t('buyNow')}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setQuoteOpen(true)}
              >
                {t('requestQuote')}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  const wasSaved = has(product.id)
                  toggle(product.id)
                  toast(wasSaved ? 'Removed from wishlist' : 'Saved to wishlist')
                }}
              >
                {has(product.id) ? '♥ Saved' : '♡ Wishlist'}
              </button>
            </div>

            <h3>Specifications</h3>
            <table className="specs-table">
              <tbody>
                {product.specs.map((s) => (
                  <tr key={s.label}>
                    <th>{s.label}</th>
                    <td>{s.value}</td>
                  </tr>
                ))}
                <tr>
                  <th>Country of origin</th>
                  <td>{product.origin}</td>
                </tr>
              </tbody>
            </table>

            {quoteOpen && (
              <form
                className="form-panel"
                style={{ marginTop: '1rem' }}
                onSubmit={(e) => {
                  e.preventDefault()
                  setQuoteOpen(false)
                  toast('Quote request sent — trade desk will reply')
                }}
              >
                <h3>Request quote</h3>
                <div className="grid-2">
                  <div className="field">
                    <label>Company</label>
                    <input required name="company" />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input required type="email" name="email" />
                  </div>
                </div>
                <div className="field">
                  <label>Quantity / destination</label>
                  <textarea required placeholder="e.g. 2 MT to Hamburg, FOB Mundra" />
                </div>
                <button type="submit" className="btn">
                  Send RFQ
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="divider" />
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet for this pigment lot.</p>
        ) : (
          <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
            {reviews.map((r) => (
              <div key={r.id} className="review-slide">
                <Stars rating={r.rating} />
                <h3 style={{ fontSize: '1.1rem' }}>{r.title}</h3>
                <p>{r.body}</p>
                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
                  {r.author} · {r.country} · {r.date}
                </div>
              </div>
            ))}
          </div>
        )}

        <h2>Related products</h2>
        <ProductGrid products={related} />
      </div>
    </>
  )
}
