import { useState } from 'react'
import { getData, updateData, deleteData } from '../services/storage'
import './MySubscriptions.css'

function MySubscriptions({ user }) {
  const [items, setItems] = useState(() => getData('subscriptions').filter((item) => item.userId === user.id))

  function refresh() {
    setItems(getData('subscriptions').filter((item) => item.userId === user.id))
  }

  function changeStatus(item, status) {
    updateData('subscriptions', item.id, { status })
    refresh()
  }

  function cancel(item) {
    if (!window.confirm('Cancel this subscription?')) return
    updateData('subscriptions', item.id, { status: 'Cancelled' })
    refresh()
  }

  return (
    <section className="container page"><span className="eyebrow">YOUR DELIVERY PLAN</span><h1>My subscriptions</h1><p className="muted">Manage your daily milk plans.</p>
      <div className="plan-list">{items.map((item) => <article className="plan-card" key={item.id}><div><span className="eyebrow">{item.id}</span><h3>{item.milkType}</h3><p>{item.litre} L · {item.time} · {item.days} days</p><p>{item.startDate} to {item.endDate}</p><strong>₹{item.totalPrice}</strong></div><div className="plan-actions"><span className={`status ${item.status}`}>{item.status}</span>{item.status === 'Active' && <button className="light-btn" onClick={() => changeStatus(item, 'Paused')}>Pause</button>}{item.status === 'Paused' && <button className="green-btn" onClick={() => changeStatus(item, 'Active')}>Resume</button>}{item.status !== 'Cancelled' && item.status !== 'Completed' && <button className="red-btn" onClick={() => cancel(item)}>Cancel</button>}</div></article>)}</div>
      {items.length === 0 && <div className="empty">You have no subscriptions yet.</div>}
    </section>
  )
}

export default MySubscriptions
