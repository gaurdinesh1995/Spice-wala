import { Link } from 'react-router-dom'
import { products } from '../data/catalog'
import { PageHero, ProductGrid } from '../components/ProductCard'
import { useWishlist } from '../context/WishlistContext'
import { usePreferences } from '../context/PreferencesContext'

export function WishlistPage() {
  const { ids } = useWishlist()
  const { t } = usePreferences()
  const list = products.filter((p) => ids.includes(p.id))

  return (
    <>
      <PageHero title={t('wishlist')} eyebrow="Saved" pigment="cardamom" />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        {list.length === 0 ? (
          <div className="empty-state">
            <h3>{t('emptyWishlist')}</h3>
            <Link to="/products" className="btn">
              Browse pigments
            </Link>
          </div>
        ) : (
          <ProductGrid products={list} />
        )}
      </div>
    </>
  )
}
