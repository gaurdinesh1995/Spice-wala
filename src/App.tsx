import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ToastProvider } from './components/Toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { PreferencesProvider } from './context/PreferencesContext'
import { WishlistProvider } from './context/WishlistContext'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { WishlistPage } from './pages/WishlistPage'
import { AccountPage } from './pages/AccountPage'
import { TrackOrderPage } from './pages/TrackOrderPage'
import {
  AboutPage,
  AdminPage,
  BlogDetailPage,
  BlogsPage,
  BulkOrdersPage,
  CategoriesPage,
  CategoryDetailPage,
  CertificationsPage,
  ContactPage,
  DistributorPage,
  ExportPage,
  FaqPage,
  GalleryPage,
  NotFoundPage,
  PrivateLabelPage,
} from './pages/ContentPages'

export default function App() {
  return (
    <PreferencesProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:slug" element={<ProductDetailPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/categories/:slug" element={<CategoryDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/track-order" element={<TrackOrderPage />} />
                    <Route path="/export" element={<ExportPage />} />
                    <Route path="/private-label" element={<PrivateLabelPage />} />
                    <Route path="/bulk-orders" element={<BulkOrdersPage />} />
                    <Route path="/distributor" element={<DistributorPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/certifications" element={<CertificationsPage />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </PreferencesProvider>
  )
}
