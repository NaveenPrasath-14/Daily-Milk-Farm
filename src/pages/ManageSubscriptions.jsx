import './ManageSubscriptions.css'
import { useState } from 'react'
import './Owner.css'
import { getData, updateData, deleteData } from '../services/storage'

function ManageSubscriptions() {
  const [plans, setPlans] = useState(getData('subscriptions'))
  const [customers, setCustomers] = useState(getData('users').filter((item) => item.role === 'Customer'))

  function refresh() {
    setPlans(getData('subscriptions'))
    setCustomers(getData('users').filter((item) => item.role === 'Customer'))
  }

  function status(item, value) {
    updateData('subscriptions', item.id, { status: value })
    refresh()
  }

  function removeCustomer(item) {
    if (!window.confirm('Delete this customer account?')) return
    deleteData('users', item.id)
    refresh()
  }

  return (
    <section className="container page"><span className="eyebrow">CUSTOMER MANAGEMENT</span><h1>Manage subscriptions</h1>
      <div className="table-wrap"><table><thead><tr><th>Customer</th><th>Product</th><th>Quantity</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody>{plans.map((item) => <tr key={item.id}><td>{item.customerName}</td><td>{item.milkType}</td><td>{item.litre} L</td><td>₹{item.totalPrice}</td><td><span className={`status ${item.status}`}>{item.status}</span></td><td><div className="table-actions">{item.status !== 'Active' && <button className="green-btn" onClick={() => status(item, 'Active')}>Accept / Resume</button>}{item.status === 'Active' && <button className="light-btn" onClick={() => status(item, 'Paused')}>Pause</button>}{item.status !== 'Cancelled' && <button className="red-btn" onClick={() => status(item, 'Cancelled')}>Cancel</button>}</div></td></tr>)}</tbody></table></div>
      <h2 className="subheading">Customers</h2>
      <div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Action</th></tr></thead><tbody>{customers.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.email}</td><td>{item.phone}</td><td>{item.address}</td><td><button className="red-btn" onClick={() => removeCustomer(item)}>Delete</button></td></tr>)}</tbody></table></div>
    </section>
  )
}

export default ManageSubscriptions
