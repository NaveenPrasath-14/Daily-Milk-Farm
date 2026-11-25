import { useState } from 'react'
import { getData, updateData } from '../services/storage'
import './Deliveries.css'

function Deliveries({ user }) {
  const [items, setItems] = useState(() => {
    const all = getData('deliveries')
    if (user.role === 'Customer') return all.filter((item) => item.userId === user.id)
    return all
  })
  const [deliveryUsers] = useState(() => getData('users').filter((item) => item.role === 'Delivery Boy'))

  function refresh() {
    const all = getData('deliveries')
    if (user.role === 'Customer') setItems(all.filter((item) => item.userId === user.id))
    else setItems(all)
  }

  function updateStatus(item, status) {
    updateData('deliveries', item.id, { status })
    refresh()
  }

  function assign(item, deliveryBoy) {
    updateData('deliveries', item.id, { deliveryBoy })
    refresh()
  }

  return (
    <section className="container page"><span className="eyebrow">DELIVERY TRACKER</span><h1>{user.role === 'Customer' ? 'My deliveries' : 'Daily delivery list'}</h1><p className="muted">Track every delivery from your farm to your doorstep.</p>
      <div className="delivery-items">{items.map((item) => <article className="delivery-item" key={item.id}><div><strong>{item.date}</strong><span>{item.time}</span></div><div><h3>{item.milk}</h3><p>{item.customerName} · {item.litre} L</p><p>{item.address}</p></div><div className="delivery-actions"><span className={`status ${item.status}`}>{item.status}</span>{user.role === 'Owner' && <select value={item.deliveryBoy || 'Not assigned'} onChange={(event) => assign(item, event.target.value)}><option>Not assigned</option>{deliveryUsers.map((person) => <option key={person.id}>{person.name}</option>)}</select>}{user.role === 'Delivery Boy' && <><button className="green-btn" onClick={() => updateStatus(item, 'Delivered')}>Delivered</button><button className="red-btn" onClick={() => updateStatus(item, 'Missed')}>Missed</button></>}</div></article>)}</div>
      {items.length === 0 && <div className="empty">No delivery records yet. New subscription deliveries will appear here.</div>}
    </section>
  )
}

export default Deliveries
