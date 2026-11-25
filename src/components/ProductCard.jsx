import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import './ProductCard.css'

function ProductCard({ product }) {
  const isMilk = ['Cow Milk', 'Buffalo Milk', 'Badam Milk', 'Coconut Milk'].includes(product.category)
  const unit = isMilk ? 'litre' : 'kg'

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-img"><img src={product.image} alt={product.name} /><span>{product.category}</span></Link>
      <div className="product-content">
        <div className="product-title"><h3>{product.name}</h3><span><Star size={14} fill="currentColor" /> {product.rating}</span></div>
        <strong className="product-price">₹{product.pricePerLitre} <small>/ {unit}</small></strong>
        <p>{product.stock} {unit === 'litre' ? 'litres' : 'kg'} available</p>
        <div className="product-card-actions"><Link to={`/order?product=${product.id}`} className="green-btn full-btn">Order Once</Link><Link to={`/subscribe?product=${product.id}`} className="light-btn full-btn">Subscribe</Link></div>
      </div>
    </article>
  )
}

export default ProductCard
