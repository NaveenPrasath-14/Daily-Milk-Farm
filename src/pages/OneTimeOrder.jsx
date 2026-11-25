import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../services/storage'
import './OneTimeOrder.css'

function OneTimeOrder({ user }) {
  const [params] = useSearchParams()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ productId: params.get('product') || '', quantity: '1', deliveryDate: new Date().toISOString().slice(0, 10), deliveryTime: 'Morning', address: user.address || '', phone: user.phone || '', notes: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(response.data)
      if (!params.get('product') && response.data.length) setForm((current) => ({ ...current, productId: String(response.data[0].id) }))
    }).catch(() => setError('Products load aagala. JSON Server running ah check pannunga.'))
  }, [])

  const product = products.find((item) => String(item.id) === String(form.productId))
  const total = product ? Number(product.pricePerLitre) * Number(form.quantity) : 0

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function submit(event) {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      const order = {
        userId: user.id,
        customerName: user.name,
        productId: product.id,
        productName: product.name,
        category: product.category,
        quantity: Number(form.quantity),
        unitPrice: Number(product.pricePerLitre),
        total: total,
        deliveryDate: form.deliveryDate,
        deliveryTime: form.deliveryTime,
        address: form.address,
        phone: form.phone,
        notes: form.notes,
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'Pending',
        status: 'Pending',
        orderDate: new Date().toISOString()
      }
      const response = await api.post('/orders', order)
      await api.post('/deliveries', {
        userId: user.id,
        customerName: user.name,
        date: form.deliveryDate,
        milk: product.name,
        litre: Number(form.quantity),
        time: form.deliveryTime,
        address: form.address,
        status: 'Pending',
        deliveryBoy: 'Not assigned',
        orderId: response.data.id
      })
      setMessage(`Order placed successfully! Order ID: ${response.data.id}`)
    } catch {
      setError('Order place panna mudiyala. JSON Server running ah check pannunga.')
    }
    setSaving(false)
  }

  return (
    <section className="container page">
      <span className="eyebrow">ONE-TIME PURCHASE</span>
      <h1>Order products individually</h1>
      <p className="muted">Subscription thevai illa. Ungalukku venum product mattum select panni order pannunga.</p>
      <form className="form-card one-time-form" onSubmit={submit}>
        <div className="order-note"><strong>One-time order</strong><span>Indha order-ku mattum delivery. Daily subscription automatically create aagadhu.</span></div>
        <div className="grid-2">
          <div className="field"><label>Select product</label><select name="productId" value={form.productId} onChange={change} required>{products.map((item) => <option key={item.id} value={item.id}>{item.name} – ₹{item.pricePerLitre}</option>)}</select></div>
          <div className="field"><label>Quantity</label><select name="quantity" value={form.quantity} onChange={change}><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="5">5</option></select></div>
          <div className="field"><label>Delivery date</label><input type="date" name="deliveryDate" min={new Date().toISOString().slice(0, 10)} value={form.deliveryDate} onChange={change} required /></div>
          <div className="field"><label>Delivery time</label><select name="deliveryTime" value={form.deliveryTime} onChange={change}><option>Morning</option><option>Evening</option></select></div>
          <div className="field"><label>Phone number</label><input name="phone" value={form.phone} onChange={change} required /></div>
          <div className="field"><label>Payment method</label><input value="Cash on Delivery" disabled /></div>
        </div>
        <div className="field"><label>Delivery address</label><textarea name="address" rows="3" value={form.address} onChange={change} required /></div>
        <div className="field"><label>Notes (optional)</label><textarea name="notes" rows="2" value={form.notes} onChange={change} placeholder="Delivery instructions" /></div>
        <div className="price-box"><span>{product ? `${product.name} · ₹${product.pricePerLitre} × ${form.quantity}` : 'Select a product'}</span><strong>Order total: ₹{total.toFixed(2)}</strong></div>
        {error && <p className="error">{error}</p>}
        {message ? <><p className="success">{message}</p><button type="button" className="green-btn" onClick={() => navigate('/my-orders')}>View my orders</button></> : <button className="green-btn" disabled={saving || !product}>{saving ? 'Placing order...' : 'Place one-time order'}</button>}
      </form>
    </section>
  )
}

export default OneTimeOrder
