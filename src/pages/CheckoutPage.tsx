import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHero } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { usePreferences } from '../context/PreferencesContext'
import { formatMoney } from '../utils/money'
import { paymentMethods } from '../data/pigments'
import { useToast } from '../components/Toast'

export function CheckoutPage() {
  const { items, subtotalInr, discountInr, shippingInr, taxInr, totalInr, clear, coupon } = useCart()
  const { user, addOrder, login } = useAuth()
  const { currency, t } = usePreferences()
  const toast = useToast()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'guest' | 'login'>(user ? 'guest' : 'guest')
  const [payment, setPayment] = useState(paymentMethods[0])
  const [sameBilling, setSameBilling] = useState(true)
  const [done, setDone] = useState<string | null>(null)

  if (!items.length && !done) {
    return (
      <>
        <PageHero title={t('checkout')} eyebrow="Checkout" pigment="saffron" />
        <div className="container" style={{ paddingBottom: '4rem' }}>
          <div className="empty-state">
            <h3>Nothing to checkout</h3>
            <Link to="/products" className="btn">
              Shop spices
            </Link>
          </div>
        </div>
      </>
    )
  }

  if (done) {
    return (
      <>
        <PageHero title="Order placed" eyebrow="Success" pigment="cardamom" />
        <div className="container" style={{ paddingBottom: '4rem' }}>
          <div className="success-banner">
            <h3 style={{ margin: '0 0 0.5rem' }}>Thank you — order {done}</h3>
            <p style={{ margin: 0 }}>
              A confirmation email will follow. Track anytime with your order ID.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to={`/track-order?id=${done}`} className="btn">
              Track order
            </Link>
            <Link to="/products" className="btn btn-ghost">
              Continue shopping
            </Link>
          </div>
        </div>
      </>
    )
  }

  function place(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const order = addOrder({
      totalInr,
      items: items.map((i) => ({ name: i.name, qty: i.qty, packSize: i.packSize })),
    })
    clear()
    setDone(order.id)
    toast(`Order ${order.id} placed`)
  }

  function doLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const res = login(String(fd.get('email')), String(fd.get('password')))
    toast(res.message)
    if (res.ok) setMode('guest')
  }

  return (
    <>
      <PageHero
        title={t('checkout')}
        eyebrow="Secure checkout"
        subtitle="Guest or account · multi-currency · global payments"
        pigment="saffron"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="tabs">
          <button type="button" className={mode === 'guest' ? 'active' : ''} onClick={() => setMode('guest')}>
            {t('guestCheckout')}
          </button>
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            {t('login')} checkout
          </button>
        </div>

        {mode === 'login' && !user ? (
          <form className="form-panel" style={{ maxWidth: 420, marginBottom: '2rem' }} onSubmit={doLogin}>
            <p className="admin-note">Demo: buyer@spicewala.com / spice123</p>
            <div className="field">
              <label>Email</label>
              <input name="email" type="email" required defaultValue="buyer@spicewala.com" />
            </div>
            <div className="field">
              <label>Password</label>
              <input name="password" type="password" required defaultValue="spice123" />
            </div>
            <button type="submit" className="btn">
              Login & continue
            </button>
          </form>
        ) : (
          <form className="checkout-layout" onSubmit={place}>
            <div>
              {user && (
                <p className="mono" style={{ marginBottom: '1rem' }}>
                  Logged in as {user.name} ({user.email})
                </p>
              )}
              <div className="form-panel" style={{ marginBottom: '1rem' }}>
                <h3>Shipping address</h3>
                <div className="grid-2">
                  <div className="field">
                    <label>Full name</label>
                    <input required name="shipName" defaultValue={user?.name} />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input required name="shipPhone" />
                  </div>
                </div>
                <div className="field">
                  <label>Address</label>
                  <input required name="shipAddr" />
                </div>
                <div className="grid-2">
                  <div className="field">
                    <label>City</label>
                    <input required name="shipCity" />
                  </div>
                  <div className="field">
                    <label>Country</label>
                    <select name="shipCountry" defaultValue="India">
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                      <option>UAE</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Germany</option>
                    </select>
                  </div>
                </div>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={sameBilling}
                    onChange={(e) => setSameBilling(e.target.checked)}
                  />
                  Billing same as shipping
                </label>
              </div>

              {!sameBilling && (
                <div className="form-panel" style={{ marginBottom: '1rem' }}>
                  <h3>Billing address</h3>
                  <div className="field">
                    <label>Address</label>
                    <input required name="billAddr" />
                  </div>
                  <div className="grid-2">
                    <div className="field">
                      <label>City</label>
                      <input required name="billCity" />
                    </div>
                    <div className="field">
                      <label>Country</label>
                      <input required name="billCountry" />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-panel">
                <h3>Payment method</h3>
                <div className="pay-methods">
                  {paymentMethods.map((m) => (
                    <label key={m}>
                      <input
                        type="radio"
                        name="pay"
                        checked={payment === m}
                        onChange={() => setPayment(m)}
                      />
                      {m}
                    </label>
                  ))}
                </div>
                {(payment === 'Credit Card' || payment === 'Debit Card' || payment === 'Stripe') && (
                  <div className="grid-2">
                    <div className="field">
                      <label>Card number</label>
                      <input required placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="field">
                      <label>Expiry / CVC</label>
                      <input required placeholder="12/28 · 123" />
                    </div>
                  </div>
                )}
                {payment === 'UPI' && (
                  <div className="field">
                    <label>UPI ID</label>
                    <input required placeholder="name@upi" />
                  </div>
                )}
                {(payment === 'Bank Transfer' || payment === 'Wise') && (
                  <p className="admin-note">Bank details will be emailed after order confirmation.</p>
                )}
              </div>
            </div>

            <aside className="summary-box">
              <h3>Your bag</h3>
              {items.map((i) => (
                <div key={`${i.productId}-${i.packSize}`} className="summary-row">
                  <span>
                    {i.name} × {i.qty}
                  </span>
                  <span className="mono">{formatMoney(i.unitPriceInr * i.qty, currency)}</span>
                </div>
              ))}
              <div className="divider" />
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
                <span className="mono">
                  {shippingInr === 0 ? 'Free' : formatMoney(shippingInr, currency)}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span className="mono">{formatMoney(taxInr, currency)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatMoney(totalInr, currency)}</span>
              </div>
              <button type="submit" className="btn btn-block" style={{ marginTop: '1rem' }}>
                {t('placeOrder')}
              </button>
              <p className="admin-note">SSL · Secure checkout simulation</p>
              <button type="button" className="btn btn-ghost btn-block btn-sm" onClick={() => navigate('/cart')}>
                Edit cart
              </button>
            </aside>
          </form>
        )}
      </div>
    </>
  )
}
