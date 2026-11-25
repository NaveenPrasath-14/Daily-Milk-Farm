import './Bills.css'
import { useState } from 'react'
import './Owner.css'
import { getData, updateData } from '../services/storage'

function Bills({ user }) {
  const [items, setItems] = useState(() => {
    const all = getData('bills')
    if (user.role === 'Customer') return all.filter((item) => item.userId === user.id)
    return all
  })

  function refresh() {
    const all = getData('bills')
    if (user.role === 'Customer') setItems(all.filter((item) => item.userId === user.id))
    else setItems(all)
  }

  function markPaid(item) {
    updateData('bills', item.id, { paymentStatus: 'Paid' })
    refresh()
  }

  function download(item) {
    const text = `DAILY MILK FARM BILL
Bill ID: ${item.id}
Month: ${item.month}
Product: ${item.milk}
Daily quantity: ${item.litre} L
Days: ${item.days}
Price per litre: Rs. ${item.pricePerLitre}
Total: Rs. ${item.total}
Payment: ${item.paymentStatus}`
    const file = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = `daily-milk-${item.id}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="container page"><span className="eyebrow">MONTHLY BILLING</span><h1>My bills</h1><p className="muted">Review subscription charges and payment status.</p>
      <div className="grid-3 bill-grid">{items.map((item) => <article className="panel bill-card" key={item.id}><div className="bill-top"><span className="eyebrow">{item.id}</span><span className={`status ${item.paymentStatus}`}>{item.paymentStatus}</span></div><h3>{item.month}</h3><p>{item.milk}</p><div className="bill-row"><span>Daily quantity</span><b>{item.litre} L</b><span>Delivery days</span><b>{item.days}</b><span>Price per litre</span><b>₹{item.pricePerLitre}</b></div><div className="bill-total"><span>Total</span><strong>₹{item.total}</strong></div><div className="table-actions"><button className="light-btn" onClick={() => download(item)}>Download bill</button>{user.role === 'Owner' && item.paymentStatus !== 'Paid' && <button className="green-btn" onClick={() => markPaid(item)}>Mark paid</button>}</div></article>)}</div>
      {items.length === 0 && <div className="empty">No bills available yet.</div>}
    </section>
  )
}

export default Bills
