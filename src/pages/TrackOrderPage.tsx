import { type FormEvent, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/ProductCard'
import { useAuth } from '../context/AuthContext'

const STEPS = ['Processing', 'Packed', 'Shipped', 'Delivered'] as const

export function TrackOrderPage() {
  const [params] = useSearchParams()
  const { orders } = useAuth()
  const [id, setId] = useState(params.get('id') ?? '')
  const [query, setQuery] = useState(params.get('id') ?? '')

  const order = useMemo(() => orders.find((o) => o.id === query), [orders, query])
  const stepIdx = order ? STEPS.indexOf(order.status) : -1

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setQuery(id.trim())
  }

  return (
    <>
      <PageHero
        title="Order tracking"
        eyebrow="Logistics"
        subtitle="Enter your SpiceWala order ID to see status."
        pigment="pepper"
      />
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: 720 }}>
        <form className="form-panel" onSubmit={onSubmit} style={{ marginBottom: '2rem' }}>
          <div className="field">
            <label>Order ID</label>
            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="SWxxxxxxxx" required />
          </div>
          <button type="submit" className="btn">
            Track
          </button>
        </form>

        {query && !order && (
          <div className="empty-state">
            <h3>No order found</h3>
            <p>Place an order from checkout to generate a trackable ID (stored in this browser).</p>
          </div>
        )}

        {order && (
          <div className="form-panel">
            <div className="eyebrow">Tracking {order.tracking}</div>
            <h2 style={{ marginTop: 0 }}>{order.id}</h2>
            <p>
              Status: <strong style={{ color: 'var(--ink)' }}>{order.status}</strong> · {order.date}
            </p>
            <div className="tracking-steps">
              {STEPS.map((s, i) => (
                <div key={s} className={`step ${i <= stepIdx ? 'done' : ''}`}>
                  {s}
                </div>
              ))}
            </div>
            <h3>Items</h3>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} — {item.packSize} × {item.qty}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
