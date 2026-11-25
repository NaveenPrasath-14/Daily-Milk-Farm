import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Subscribe from './pages/Subscribe'
import MySubscriptions from './pages/MySubscriptions'
import Deliveries from './pages/Deliveries'
import Owner from './pages/Owner'
import ManageProducts from './pages/ManageProducts'
import ManageSubscriptions from './pages/ManageSubscriptions'
import Bills from './pages/Bills'
import OneTimeOrder from './pages/OneTimeOrder'
import MyOrders from './pages/MyOrders'
import ManageOrders from './pages/ManageOrders'
import { initializeData } from './services/storage'

function App() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    initializeData().then(() => setReady(true)).catch(() => setReady(true))
  }, [])
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dailyMilkUser')
    if (saved) return JSON.parse(saved)
    return null
  })

  function loginUser(foundUser) {
    localStorage.setItem('dailyMilkUser', JSON.stringify(foundUser))
    setUser(foundUser)
  }

  function logoutUser() {
    localStorage.removeItem('dailyMilkUser')
    setUser(null)
  }

  function Protected({ children, roles }) {
    if (!user) return <Navigate to="/login" />
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />
    return children
  }

  if (!ready) return <div className="loading-screen">Loading Daily Milk Farm...</div>

  return (
    <>
      <Navbar user={user} logoutUser={logoutUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login loginUser={loginUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/subscribe" element={<Protected roles={['Customer']}><Subscribe user={user} /></Protected>} />
        <Route path="/order" element={<Protected roles={['Customer']}><OneTimeOrder user={user} /></Protected>} />
        <Route path="/my-orders" element={<Protected roles={['Customer']}><MyOrders user={user} /></Protected>} />
        <Route path="/my-subscriptions" element={<Protected roles={['Customer']}><MySubscriptions user={user} /></Protected>} />
        <Route path="/deliveries" element={<Protected roles={['Owner', 'Delivery Boy']}><Deliveries user={user} /></Protected>} />
        <Route path="/my-deliveries" element={<Protected roles={['Customer']}><Deliveries user={user} /></Protected>} />
        <Route path="/owner" element={<Protected roles={['Owner']}><Owner /></Protected>} />
        <Route path="/owner/products" element={<Protected roles={['Owner']}><ManageProducts /></Protected>} />
        <Route path="/owner/subscriptions" element={<Protected roles={['Owner']}><ManageSubscriptions /></Protected>} />
        <Route path="/owner/orders" element={<Protected roles={['Owner']}><ManageOrders /></Protected>} />
        <Route path="/bills" element={<Protected><Bills user={user} /></Protected>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
