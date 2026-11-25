import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addData, getData } from '../services/storage'
import './SubscribeForm.css'

function Subscribe({ user }) {
  const [params] = useSearchParams()
  const products = getData('products')
  const firstProduct = products.find((item) => item.id === params.get('product')) || products[0]
  const [form, setForm] = useState({ customerName: user.name, phone: user.phone || '', address: user.address || '', milkType: firstProduct.name, litre: '1', time: 'Morning', startDate: new Date().toISOString().slice(0,10), endDate: '', notes: '' })
  const [createdId, setCreatedId] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const product = products.find((item) => item.name === form.milkType)
  const start = new Date(form.startDate)
  const end = new Date(form.endDate)
  let days = 0
  if (form.endDate && end >= start) days = Math.floor((end - start) / 86400000) + 1
  const total = days * Number(form.litre) * (product ? product.pricePerLitre : 0)

  function change(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  function submit(event) {
    event.preventDefault()
    if (days < 1) {
      setError('Please select a valid end date.')
      return
    }
    const subscription = addData('subscriptions', { ...form, userId: user.id, litre: Number(form.litre), days, pricePerLitre: product.pricePerLitre, totalPrice: total, status: 'Active' })
    addData('bills', { userId: user.id, subscriptionId: subscription.id, month: new Date(form.startDate).toLocaleString('en-US', { month: 'long', year: 'numeric' }), milk: form.milkType, litre: Number(form.litre), days, pricePerLitre: product.pricePerLitre, total, paymentStatus: 'Unpaid' })
    for (let day = 0; day < days; day += 1) {
      const deliveryDate = new Date(start)
      deliveryDate.setDate(start.getDate() + day)
      addData('deliveries', { userId: user.id, customerName: user.name, date: deliveryDate.toISOString().slice(0, 10), milk: form.milkType, litre: Number(form.litre), time: form.time, address: form.address, status: 'Pending', deliveryBoy: 'Not assigned' })
    }
    setCreatedId(subscription.id)
  }

  return (
    <section className="container page"><span className="eyebrow">DAILY FRESHNESS PLAN</span><h1>Start a subscription</h1><p className="muted">Choose your quantity and delivery schedule.</p>
      <form className="form-card subscribe-form" onSubmit={submit}>
        <div className="grid-2">
          <div className="field"><label>Customer name</label><input name="customerName" value={form.customerName} onChange={change} required /></div>
          <div className="field"><label>Phone</label><input name="phone" value={form.phone} onChange={change} required /></div>
          <div className="field"><label>Milk type</label><select name="milkType" value={form.milkType} onChange={change}>{products.map((item) => <option key={item.id}>{item.name}</option>)}</select></div>
          <div className="field"><label>Daily quantity</label><select name="litre" value={form.litre} onChange={change}><option value="0.5">0.5 L</option><option value="1">1 L</option><option value="2">2 L</option><option value="3">3 L</option></select></div>
          <div className="field"><label>Delivery time</label><select name="time" value={form.time} onChange={change}><option>Morning</option><option>Evening</option><option>Both</option></select></div>
          <div className="field"><label>Start date</label><input type="date" name="startDate" value={form.startDate} onChange={change} required /></div>
          <div className="field"><label>End date</label><input type="date" name="endDate" min={form.startDate} value={form.endDate} onChange={change} required /></div>
        </div>
        <div className="field"><label>Delivery address</label><textarea name="address" rows="3" value={form.address} onChange={change} required /></div>
        <div className="field"><label>Notes</label><textarea name="notes" rows="2" value={form.notes} onChange={change} /></div>
        <div className="price-box"><span>₹{product.pricePerLitre} × {form.litre} L × {days} days</span><strong>Estimated total: ₹{total.toFixed(2)}</strong></div>
        {error && <p className="error">{error}</p>}
        {createdId ? <><p className="success">Subscription created. Your ID: {createdId}</p><button type="button" className="green-btn" onClick={() => navigate('/my-subscriptions')}>View my subscriptions</button></> : <button className="green-btn">Place subscription</button>}
      </form>
    </section>
  )
}

export default Subscribe
