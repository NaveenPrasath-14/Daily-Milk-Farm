import { useEffect, useState } from 'react'
import { api } from '../services/storage'
import './ManageOrders.css'

function ManageOrders() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  async function loadOrders() {
    try {
      const response = await api.get('/orders')
      setOrders(response.data)
    } catch {
      setError('Orders load aagala. JSON Server running ah check pannunga.')
    }
  }

  useEffect(() => { loadOrders() }, [])

  async function updateOrder(item, changes) {
    try {
      await api.patch(`/orders/${item.id}`, changes)
      loadOrders()
    } catch {
      setError('Order update panna mudiyala.')
    }
  }

  return (
    <section className="container page">
      <span className="eyebrow">INDIVIDUAL PURCHASES</span>
      <h1>Manage one-time orders</h1>
      <p className="muted">Customer subscription illama place panna orders-ai inga manage pannalam.</p>
      <div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Qty</th><th>Delivery</th><th>Total</th><th>Status</th><th>Update</th></tr></thead><tbody>
        {orders.map((item) => <tr key={item.id}><td>#{item.id}</td><td>{item.customerName}<br />{item.phone}</td><td>{item.productName}</td><td>{item.quantity}</td><td>{item.deliveryDate}<br />{item.deliveryTime}</td><td>₹{item.total}</td><td><span className={`status ${item.status}`}>{item.status}</span></td><td><div className="table-actions"><select value={item.status} onChange={(event) => updateOrder(item, { status: event.target.value })}><option>Pending</option><option>Confirmed</option><option>Out for Delivery</option><option>Delivered</option><option>Cancelled</option></select><select value={item.paymentStatus} onChange={(event) => updateOrder(item, { paymentStatus: event.target.value })}><option>Pending</option><option>Paid</option></select></div></td></tr>)}
      </tbody></table></div>
      {error && <p className="error">{error}</p>}
      {orders.length === 0 && !error && <div className="empty">No one-time orders received yet.</div>}
    </section>
  )
}

export default ManageOrders
