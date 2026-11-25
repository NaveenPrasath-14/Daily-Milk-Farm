import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/storage'
import './MyOrders.css'

function MyOrders({ user }) {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/orders?userId=${user.id}`).then((response) => setOrders(response.data)).catch(() => setError('Orders load aagala. JSON Server running ah check pannunga.'))
  }, [user.id])

  return (
    <section className="container page">
      <span className="eyebrow">YOUR PURCHASES</span>
      <h1>My one-time orders</h1>
      <p className="muted">Subscription plans illama neenga place panna individual orders.</p>
      <div className="plan-list">
        {orders.map((item) => <article className="plan-card" key={item.id}>
          <div><span className="eyebrow">ORDER #{item.id}</span><h3>{item.productName}</h3><p>{item.quantity} × ₹{item.unitPrice} · {item.deliveryTime}</p><p>Delivery: {item.deliveryDate}</p><p>{item.address}</p><strong>₹{Number(item.total).toFixed(2)}</strong></div>
          <div className="order-status"><span className={`status ${item.status}`}>{item.status}</span><span className="muted">{item.paymentMethod}</span></div>
        </article>)}
      </div>
      {error && <p className="error">{error}</p>}
      {orders.length === 0 && !error && <div className="empty">No individual orders yet. <Link to="/products">Browse products</Link> and place your first order.</div>}
    </section>
  )
}

export default MyOrders
