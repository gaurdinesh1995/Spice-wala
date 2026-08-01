import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { usePreferences } from '../context/PreferencesContext'
import { formatMoney } from '../utils/money'
import { pigments } from '../data/pigments'
import { useToast } from '../components/Toast'

export function CartPage() {
  const {
    items,
    updateQty,
    removeItem,
    subtotalInr,
    discountInr,
    shippingInr,
    taxInr,
    totalInr,
    coupon,
    applyCoupon,
  } = useCart()
  const { currency, t } = usePreferences()
  const [code, setCode] = useState('')
  const toast = useToast()

  function onCoupon(e: FormEvent) {
    e.preventDefault()
    const res = applyCoupon(code)
    toast(res.message)
  }

  if (!items.length) {
    return (
      <>
        <PageHero title={t('cart')} eyebrow="Bag" pigment="chili" />
        <div className="container" style={{ paddingBottom: '4rem' }}>
          <div className="empty-state">
            <h3>{t('emptyCart')}</h3>
            <p>Fill it with turmeric gold and chili brick.</p>
            <Link to="/products" className="btn">
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHero title={t('cart')} eyebrow="Bag" subtitle={`${items.length} line items`} pigment="chili" />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="cart-layout">
          <div>
            {items.map((item) => (
              <div key={`${item.productId}-${item.packSize}`} className="cart-line">
                <img src={item.image} alt="" />
                <div>
                  <div className="eyebrow" style={{ marginBottom: 4 }}>
                    <span className="swatch" style={{ background: pigments[item.pigment].hex }} />
                    {item.packSize}
                  </div>
                  <Link to={`/products/${item.slug}`}>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem' }}>{item.name}</h3>
                  </Link>
                  <div className="qty-ctrl">
                    <button type="button" onClick={() => updateQty(item.productId, item.packSize, item.qty - 1)}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.productId, item.packSize, item.qty + 1)}>
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    style={{ marginTop: 8 }}
                    onClick={() => removeItem(item.productId, item.packSize)}
                  >
                    Remove
                  </button>
                </div>
                <div className="price">{formatMoney(item.unitPriceInr * item.qty, currency)}</div>
              </div>
            ))}
          </div>
          <aside className="summary-box">
            <h3>Order summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="mono">{formatMoney(subtotalInr, currency)}</span>
            </div>
            <div className="summary-row">
              <span>Discount {coupon ? `(${coupon})` : ''}</span>
              <span className="mono">−{formatMoney(discountInr, currency)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="mono">{shippingInr === 0 ? 'Free' : formatMoney(shippingInr, currency)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%)</span>
              <span className="mono">{formatMoney(taxInr, currency)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatMoney(totalInr, currency)}</span>
            </div>
            <form onSubmit={onCoupon} style={{ display: 'flex', gap: 8, margin: '1rem 0' }}>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Coupon (SPICE10)"
                style={{
                  flex: 1,
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  padding: '0.55rem',
                }}
              />
              <button type="submit" className="btn btn-sm btn-ghost">
                Apply
              </button>
            </form>
            <Link to="/checkout" className="btn btn-block">
              {t('checkout')}
            </Link>
            <p className="admin-note">Try SPICE10, HALDI15, or EXPORT5</p>
          </aside>
        </div>
      </div>
    </>
  )
}
