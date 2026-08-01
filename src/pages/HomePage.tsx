import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogs, categories, certificates, products, reviews } from '../data/catalog'
import { exportCountries } from '../data/pigments'
import { ProductGrid, SectionHead, PigmentSwatch } from '../components/ProductCard'
import { usePreferences } from '../context/PreferencesContext'
import { useToast } from '../components/Toast'

export function HomePage() {
  const { t } = usePreferences()
  const toast = useToast()
  const [email, setEmail] = useState('')

  const featured = products.filter((p) => p.featured).slice(0, 4)
  const best = products.filter((p) => p.bestSeller).slice(0, 4)
  const newest = products.filter((p) => p.newArrival).slice(0, 4)

  function subscribe(e: FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) {
      toast('Enter a valid email')
      return
    }
    toast('Subscribed — welcome to the pigment loop')
    setEmail('')
  }

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-bg" aria-hidden />
        <div className="container home-hero-content">
          <p className="brand-signal fade-up">SpiceWala</p>
          <h1 className="fade-up-delay">Spices graded like pigments for kitchens and containers.</h1>
          <p className="lede fade-up-delay">
            From turmeric gold to chili brick — retail packs, wholesale lots, and private-label OEM
            shipped worldwide.
          </p>
          <div className="hero-cta fade-up-delay">
            <Link to="/products" className="btn">
              {t('shop')}
            </Link>
            <Link to="/export" className="btn btn-ghost">
              {t('export')}
            </Link>
          </div>
          <div className="hero-pigments" aria-hidden>
            <span style={{ background: 'var(--pigment-turmeric)', animationDelay: '0.1s' }} />
            <span style={{ background: 'var(--pigment-chili)', animationDelay: '0.18s' }} />
            <span style={{ background: 'var(--pigment-cardamom)', animationDelay: '0.26s' }} />
            <span style={{ background: 'var(--pigment-saffron)', animationDelay: '0.34s' }} />
            <span style={{ background: 'var(--pigment-cumin)', animationDelay: '0.42s' }} />
            <span style={{ background: 'var(--pigment-mustard)', animationDelay: '0.5s' }} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            title={t('categories')}
            subtitle="Browse by form — whole, ground, blends, seeds, premium, organic."
            action={
              <Link to="/categories" className="btn btn-ghost btn-sm">
                All categories
              </Link>
            }
          />
          <div className="grid-3">
            {categories.slice(0, 6).map((c) => (
              <Link key={c.id} to={`/categories/${c.slug}`} className="category-tile">
                <span className="bar" style={{ background: `var(--pigment-${c.pigment})` }} />
                <img src={c.image} alt="" />
                <div className="category-tile-body">
                  <div className="eyebrow">
                    <PigmentSwatch pigment={c.pigment} />
                    {c.count} SKUs
                  </div>
                  <h3 style={{ margin: 0 }}>{c.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead title={t('featured')} subtitle="Pigment-forward SKUs our buyers reorder." />
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead title={t('bestSelling')} />
          <ProductGrid products={best} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead title={t('newArrivals')} />
          <ProductGrid products={newest} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container feature-block">
          <div>
            <div className="eyebrow">
              <PigmentSwatch pigment="saffron" />
              Export Worldwide
            </div>
            <h2>From Indian mills to your market — documents included.</h2>
            <p>
              Containers, air freight, and retail parcels. COO, phytosanitary, Halal, Kosher, and
              lab reports travel with the cargo.
            </p>
            <Link to="/export" className="btn">
              Export desk
            </Link>
          </div>
          <div className="video-frame">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>
                Factory Video
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Sorting · milling · packing</h3>
              <p style={{ marginBottom: '1rem' }}>Walk our pigment floor — steam sterilize to pouch.</p>
              <a
                className="btn btn-ghost"
                href="https://www.youtube.com/results?search_query=spice+factory+india"
                target="_blank"
                rel="noreferrer"
              >
                Watch factory tour
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead title={t('whyUs')} subtitle="Colour grades, compliance, and flexible B2B." />
          <div className="why-grid">
            {[
              { p: 'turmeric' as const, t: 'Pigment grading', d: 'Curcumin, ASTA, crocin — colour as quality language.' },
              { p: 'chili' as const, t: 'Retail + wholesale', d: 'Jar shelves and 25kg bags from one catalogue.' },
              { p: 'cardamom' as const, t: 'Private label OEM', d: 'Your recipe, mesh, and artwork on our lines.' },
              { p: 'cumin' as const, t: 'Export ready', d: 'Docs, sterilization, and multi-currency checkout.' },
            ].map((item) => (
              <div key={item.t} className="why-item" style={{ borderTopColor: `var(--pigment-${item.p})` }}>
                <h3>{item.t}</h3>
                <p style={{ margin: 0 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead title="Certificates" action={<Link to="/certifications" className="btn btn-ghost btn-sm">View all</Link>} />
          <div className="cert-strip">
            {certificates.map((c) => (
              <div key={c.id} className="cert-pill">
                {c.name} · {c.year}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead title="Customer reviews" />
          <div className="grid-3">
            {reviews.slice(0, 3).map((r) => (
              <blockquote key={r.id} className="review-slide" style={{ margin: 0 }}>
                <div className="stars">{'★'.repeat(r.rating)}</div>
                <h3 style={{ fontSize: '1.15rem' }}>{r.title}</h3>
                <p>{r.body}</p>
                <footer className="mono" style={{ fontSize: '0.78rem', color: 'var(--ink-faint)' }}>
                  {r.author} · {r.country}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead title="Countries we export" subtitle="India base · global shelves." />
          <div>
            {exportCountries.map((c) => (
              <span key={c.code} className="country-chip">
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead title="From the journal" action={<Link to="/blogs" className="btn btn-ghost btn-sm">All posts</Link>} />
          <div className="grid-3">
            {blogs.map((b) => (
              <Link key={b.id} to={`/blogs/${b.slug}`} className="blog-card">
                <img src={b.image} alt="" />
                <div className="eyebrow">{b.category}</div>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{b.title}</h3>
                <p style={{ margin: 0 }}>{b.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container newsletter">
          <div>
            <div className="eyebrow">Newsletter</div>
            <h2 style={{ marginBottom: 8 }}>{t('newsletter')}</h2>
            <p style={{ margin: 0 }}>Harvest notes, export tips, and new pigment lots — monthly.</p>
          </div>
          <form className="newsletter-form" onSubmit={subscribe}>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn">
              {t('subscribe')}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
