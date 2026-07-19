import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from '../components/navigation/ScrollToTop'
import { MainLayout } from '../layouts/MainLayout'
import About from '../pages/About'
import CartPage from '../pages/Cart'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Products from '../pages/Products'

export const AppRoutes = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:category" element={<Products />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

