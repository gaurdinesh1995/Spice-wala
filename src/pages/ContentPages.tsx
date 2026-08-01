import { type FormEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categories, getCategoryBySlug, getProductsByCategory, products } from '../data/catalog'
import { PageHero, PigmentSwatch, ProductGrid } from '../components/ProductCard'
import { useToast } from '../components/Toast'
import { exportCountries, paymentMethods } from '../data/pigments'
import { certificates, blogs, getBlogBySlug, gallery, faqs } from '../data/catalog'

export function CategoriesPage() {
  return (
    <>
      <PageHero
        title="Categories"
        eyebrow="Taxonomy"
        subtitle="Six shelves — each tagged with a pigment swatch."
        pigment="coriander"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="grid-3">
          {categories.map((c) => (
            <Link key={c.id} to={`/categories/${c.slug}`} className="category-tile" style={{ minHeight: 260 }}>
              <span className="bar" style={{ background: `var(--pigment-${c.pigment})` }} />
              <img src={c.image} alt="" />
              <div className="category-tile-body">
                <div className="eyebrow">
                  <PigmentSwatch pigment={c.pigment} />
                  {c.count} products
                </div>
                <h3 style={{ margin: '0 0 0.35rem' }}>{c.name}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export function CategoryDetailPage() {
  const { slug } = useParams()
  const cat = getCategoryBySlug(slug ?? '')
  if (!cat) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="empty-state">
          <h3>Category not found</h3>
          <Link to="/categories" className="btn">
            All categories
          </Link>
        </div>
      </div>
    )
  }
  const list = getProductsByCategory(cat.id)
  return (
    <>
      <PageHero title={cat.name} eyebrow="Category" subtitle={cat.description} pigment={cat.pigment} />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <ProductGrid products={list.length ? list : products.slice(0, 4)} />
      </div>
    </>
  )
}

function LeadForm({
  title,
  fields,
  onDone,
}: {
  title: string
  fields?: 'export' | 'oem' | 'bulk' | 'distributor' | 'contact' | 'sample'
  onDone: () => void
}) {
  return (
    <form
      className="form-panel"
      onSubmit={(e: FormEvent) => {
        e.preventDefault()
        onDone()
      }}
    >
      <h3>{title}</h3>
      <div className="grid-2">
        <div className="field">
          <label>Name</label>
          <input required name="name" />
        </div>
        <div className="field">
          <label>Email</label>
          <input required type="email" name="email" />
        </div>
      </div>
      <div className="grid-2">
        <div className="field">
          <label>Company</label>
          <input name="company" />
        </div>
        <div className="field">
          <label>Country</label>
          <select name="country" defaultValue="USA">
            {exportCountries.map((c) => (
              <option key={c.code}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
      {(fields === 'export' || fields === 'bulk' || fields === 'oem') && (
        <div className="field">
          <label>Product / volume</label>
          <input name="volume" placeholder="e.g. Turmeric 5 MT / month" />
        </div>
      )}
      {fields === 'distributor' && (
        <div className="field">
          <label>Territory & channels</label>
          <input name="territory" placeholder="e.g. Ontario retail + HORECA" />
        </div>
      )}
      {fields === 'oem' && (
        <div className="field">
          <label>Packaging preference</label>
          <select name="pack">
            <option>Pouch</option>
            <option>Tin</option>
            <option>Jar</option>
            <option>Bulk bag</option>
          </select>
        </div>
      )}
      <div className="field">
        <label>Message</label>
        <textarea name="message" required />
      </div>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  )
}

export function ExportPage() {
  const toast = useToast()
  return (
    <>
      <PageHero
        title="Export"
        eyebrow="Trade"
        subtitle="Containers from Indian ports to USA, UK, UAE, EU, Australia, and beyond."
        pigment="saffron"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="feature-block" style={{ marginBottom: '3rem' }}>
          <div>
            <h2>Export documents with every consignment</h2>
            <p>
              Commercial invoice, packing list, certificate of origin, phytosanitary, FSSAI, lab
              reports, Halal/Kosher, and steam-sterilization certificates as required by destination.
            </p>
            <div>
              {exportCountries.map((c) => (
                <span key={c.code} className="country-chip">
                  {c.name}
                </span>
              ))}
            </div>
          </div>
          <LeadForm title="Export inquiry" fields="export" onDone={() => toast('Export inquiry received')} />
        </div>
      </div>
    </>
  )
}

export function PrivateLabelPage() {
  const toast = useToast()
  return (
    <>
      <PageHero
        title="Private Label / OEM"
        eyebrow="Your brand"
        subtitle="Lock recipe, mesh, roast, and artwork — we manufacture."
        pigment="chili"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="why-grid" style={{ marginBottom: '2.5rem' }}>
          {[
            { t: 'Recipe lock', d: 'Your ratios or our house blends.' },
            { t: 'Pack formats', d: 'Pouches, tins, jars, kraft bags.' },
            { t: 'MOQ clarity', d: 'From pilot runs to full containers.' },
            { t: 'Lead time', d: 'Typically 3–5 weeks post artwork.' },
          ].map((x) => (
            <div key={x.t} className="why-item">
              <h3>{x.t}</h3>
              <p style={{ margin: 0 }}>{x.d}</p>
            </div>
          ))}
        </div>
        <LeadForm title="OEM / private label brief" fields="oem" onDone={() => toast('OEM brief submitted')} />
      </div>
    </>
  )
}

export function BulkOrdersPage() {
  const toast = useToast()
  return (
    <>
      <PageHero
        title="Bulk Orders"
        eyebrow="Wholesale"
        subtitle="MOQ-based pricing, sample requests, and RFQ for B2B buyers."
        pigment="cumin"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="grid-2">
          <LeadForm title="RFQ — bulk pricing" fields="bulk" onDone={() => toast('RFQ submitted')} />
          <LeadForm title="Sample request" fields="sample" onDone={() => toast('Sample request logged')} />
        </div>
        <p className="admin-note" style={{ marginTop: '1.5rem' }}>
          Wholesale buyers: request country-specific pricing. Retail checkout uses automatic currency
          conversion from INR base.
        </p>
      </div>
    </>
  )
}

export function DistributorPage() {
  const toast = useToast()
  return (
    <>
      <PageHero
        title="Distributor registration"
        eyebrow="Partners"
        subtitle="Register for territorial distribution of SpiceWala pigments."
        pigment="cardamom"
      />
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: 720 }}>
        <LeadForm
          title="Become a distributor"
          fields="distributor"
          onDone={() => toast('Application received — trade team will respond in 3 business days')}
        />
      </div>
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <PageHero
        title="About SpiceWala"
        eyebrow="Our story"
        subtitle="A manufacturer-exporter that grades spices the way painters grade pigment."
        pigment="turmeric"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="feature-block">
          <div>
            <h2>B2B + B2C from one floor</h2>
            <p>
              SpiceWala Foods processes whole spices and powders for Indian retail and global export.
              Our quality language is colour — curcumin for turmeric, ASTA for chili, crocin for
              saffron — the same swatches you see across this site.
            </p>
            <p>
              Targets: India, USA, Canada, UK, UAE, Australia, Germany, Saudi Arabia, Europe, and Asia.
              Channels: retail, wholesale, private label, and distributors.
            </p>
          </div>
          <div className="pigment-row" style={{ height: 160, gap: 6 }} aria-hidden>
            {['turmeric', 'chili', 'cardamom', 'saffron', 'cumin', 'coriander'].map((p) => (
              <span key={p} style={{ flex: 1, height: '100%', background: `var(--pigment-${p})` }} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export function CertificationsPage() {
  return (
    <>
      <PageHero
        title="Certifications"
        eyebrow="Trust"
        subtitle="Download-ready compliance for buyers and customs."
        pigment="pepper"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="grid-3">
          {certificates.map((c) => (
            <div key={c.id} className="form-panel">
              <div className="eyebrow">{c.year}</div>
              <h3 style={{ marginTop: 0 }}>{c.name}</h3>
              <p>{c.description}</p>
              <p className="mono" style={{ fontSize: '0.78rem' }}>
                {c.issuer}
              </p>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => window.print()}
              >
                Download certificate
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export function BlogsPage() {
  return (
    <>
      <PageHero title="Journal" eyebrow="Blogs" subtitle="Quality notes, export tips, OEM playbooks." pigment="fenugreek" />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="grid-3">
          {blogs.map((b) => (
            <Link key={b.id} to={`/blogs/${b.slug}`} className="blog-card">
              <img src={b.image} alt="" />
              <div className="eyebrow">
                {b.category} · {b.date}
              </div>
              <h3 style={{ margin: 0 }}>{b.title}</h3>
              <p style={{ margin: 0 }}>{b.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export function BlogDetailPage() {
  const { slug } = useParams()
  const post = getBlogBySlug(slug ?? '')
  if (!post) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="empty-state">
          <h3>Post not found</h3>
          <Link to="/blogs" className="btn">
            All blogs
          </Link>
        </div>
      </div>
    )
  }
  return (
    <>
      <PageHero title={post.title} eyebrow={post.category} subtitle={`${post.author} · ${post.date}`} pigment="fenugreek" />
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: 760 }}>
        <img src={post.image} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', marginBottom: '1.5rem' }} />
        <p style={{ fontSize: '1.1rem', color: 'var(--ink-muted)' }}>{post.content}</p>
        <Link to="/blogs" className="btn btn-ghost">
          Back to journal
        </Link>
      </div>
    </>
  )
}

export function GalleryPage() {
  const [filter, setFilter] = useState<'all' | 'factory' | 'packaging' | 'farm' | 'export'>('all')
  const items = gallery.filter((g) => filter === 'all' || g.type === filter)
  return (
    <>
      <PageHero title="Gallery" eyebrow="Factory & farm" subtitle="Photos from the pigment floor." pigment="mustard" />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="pack-options" style={{ marginBottom: '1.5rem' }}>
          {(['all', 'factory', 'packaging', 'farm', 'export'] as const).map((f) => (
            <button key={f} type="button" className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {items.map((g) => (
            <div key={g.id} className="gallery-item">
              <img src={g.image} alt={g.title} loading="lazy" />
              <span>
                {g.type} · {g.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export function ContactPage() {
  const toast = useToast()
  return (
    <>
      <PageHero
        title="Contact"
        eyebrow="Talk to us"
        subtitle="+91 98765 43210 · trade@spicewala.com · WhatsApp desk open"
        pigment="chili"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="grid-2">
          <LeadForm title="Contact form" fields="contact" onDone={() => toast('Message sent')} />
          <div className="form-panel">
            <h3>Trade desk</h3>
            <p>Mon–Sat · 9:30–18:30 IST</p>
            <p>
              <a href="mailto:trade@spicewala.com">trade@spicewala.com</a>
            </p>
            <p>
              <a href="tel:+919876543210">+91 98765 43210</a>
            </p>
            <a className="btn" href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <div className="divider" />
            <h4>Payments we support</h4>
            <div className="pay-methods">
              {paymentMethods.map((m) => (
                <span key={m} className="badge">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <>
      <PageHero title="FAQ" eyebrow="Help" subtitle="Retail, wholesale, and export answers." pigment="coriander" />
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: 760 }}>
        {faqs.map((f, i) => (
          <div key={f.q} className="faq-item">
            <button type="button" onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <span>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <div className="answer">{f.a}</div>}
          </div>
        ))}
      </div>
    </>
  )
}

export function AdminPage() {
  return (
    <>
      <PageHero
        title="Admin panel"
        eyebrow="Demo"
        subtitle="Front-end preview of merchant tools — products, orders, currency, taxes."
        pigment="pepper"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="grid-3">
          {[
            'Products',
            'Categories',
            'Orders',
            'Customers',
            'Coupons',
            'Currency rates',
            'Taxes',
            'Shipping',
            'Blogs',
            'Reviews',
            'Analytics',
          ].map((mod) => (
            <div key={mod} className="form-panel">
              <h3 style={{ marginTop: 0 }}>{mod}</h3>
              <p style={{ margin: 0 }}>Module scaffold for a future CMS / API connection.</p>
              <p className="admin-note">Read-only demo</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '5rem 0' }}>
      <div className="empty-state">
        <h3>404 — spice not found</h3>
        <p>This route left the bazaar.</p>
        <Link to="/" className="btn">
          Home
        </Link>
      </div>
    </div>
  )
}
