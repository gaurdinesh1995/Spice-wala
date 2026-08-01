import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories, products, searchProducts } from '../data/catalog'
import { pigments, type PigmentKey } from '../data/pigments'
import { PageHero, ProductGrid, PigmentSwatch } from '../components/ProductCard'

export function ProductsPage() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const [category, setCategory] = useState<string>('all')
  const [pigment, setPigment] = useState<PigmentKey | 'all'>('all')
  const [sort, setSort] = useState('featured')
  const [onlySale, setOnlySale] = useState(false)

  const list = useMemo(() => {
    let result = q ? searchProducts(q) : [...products]
    if (category !== 'all') result = result.filter((p) => p.categoryId === category)
    if (pigment !== 'all') result = result.filter((p) => p.pigment === pigment)
    if (onlySale) result = result.filter((p) => p.discountPercent > 0)
    if (sort === 'price-asc') result.sort((a, b) => a.basePriceInr - b.basePriceInr)
    if (sort === 'price-desc') result.sort((a, b) => b.basePriceInr - a.basePriceInr)
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sort === 'featured') result.sort((a, b) => Number(b.featured) - Number(a.featured))
    return result
  }, [q, category, pigment, sort, onlySale])

  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Products"
        subtitle={q ? `Results for “${q}”` : 'Retail jars to export bags — every spice with its pigment chip.'}
        pigment="turmeric"
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="catalog-layout">
          <aside>
            <div className="filter-group">
              <h4>Category</h4>
              <label>
                <input type="radio" checked={category === 'all'} onChange={() => setCategory('all')} />
                All
              </label>
              {categories.map((c) => (
                <label key={c.id}>
                  <input
                    type="radio"
                    checked={category === c.id}
                    onChange={() => setCategory(c.id)}
                  />
                  <PigmentSwatch pigment={c.pigment} />
                  {c.name}
                </label>
              ))}
            </div>
            <div className="filter-group">
              <h4>Pigment</h4>
              <label>
                <input type="radio" checked={pigment === 'all'} onChange={() => setPigment('all')} />
                All swatches
              </label>
              {(Object.keys(pigments) as PigmentKey[]).map((key) => (
                <label key={key}>
                  <input
                    type="radio"
                    checked={pigment === key}
                    onChange={() => setPigment(key)}
                  />
                  <PigmentSwatch pigment={key} />
                  {pigments[key].name}
                </label>
              ))}
            </div>
            <div className="filter-group">
              <h4>Offers</h4>
              <label>
                <input type="checkbox" checked={onlySale} onChange={(e) => setOnlySale(e.target.checked)} />
                On discount
              </label>
            </div>
          </aside>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
              <p style={{ margin: 0 }} className="mono">
                {list.length} products
              </p>
              <select className="select-inline" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <ProductGrid products={list} />
          </div>
        </div>
      </div>
    </>
  )
}
