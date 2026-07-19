import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'

export const MainLayout = () => (
  <div className="container">
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </div>
)
