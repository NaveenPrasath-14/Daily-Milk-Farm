import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../services/storage'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  useEffect(() => { api.get(`/products/${id}`).then((response) => setProduct(response.data)).catch(() => setProduct(null)) }, [id])
  const isMilk = product && ['Cow Milk', 'Buffalo Milk', 'Badam Milk', 'Coconut Milk'].includes(product.category)
  const unit = isMilk ? 'litre' : 'kg'
  if (!product) return <section className="container page"><div className="empty">Loading product or product not found.</div></section>

  return (
    <section className="container page">
      <div className="detail-layout"><img src={product.image} alt={product.name} /><div><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><p className="detail-price">₹{product.pricePerLitre} <small>/ {unit}</small></p><p className="muted">{product.description}</p><ul><li>Freshly prepared and packed</li><li>Quality checked dairy product</li><li>Reliable doorstep delivery</li></ul><p>Available stock: {product.stock} {unit === 'litre' ? 'litres' : 'kg'}</p><div className="detail-actions"><Link to={`/order?product=${product.id}`} className="green-btn">Order once</Link><Link to={`/subscribe?product=${product.id}`} className="light-btn">Daily subscription</Link></div></div></div>
    </section>
  )
}

export default ProductDetail
