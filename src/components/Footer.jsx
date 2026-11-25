import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><h2>My Milk Farm</h2><p>Nature's goodness in every drop. Fresh dairy from our farm to your family.</p></div>
        <div><h3>Explore</h3><Link to="/">Home</Link><Link to="/products">Products</Link><Link to="/subscribe">Daily Subscription</Link></div>
        <div><h3>Get in touch</h3><span><MapPin size={16} /> Coimbatore, Tamil Nadu</span><span><Phone size={16} /> +91 6383110210</span><span><Mail size={16} /> hello@dailymilk.local</span></div>
      </div>
      <div className="footer-bottom">© 2026 My Milk Farm · Freshness delivered every day</div>
    </footer>
  )
}

export default Footer
