import './OwnerDashboard.css'
import { Link } from 'react-router-dom'
import { Users, Milk, Truck, Wallet, Clock3, ShoppingBag } from 'lucide-react'
import './Owner.css'
import { getData } from '../services/storage'

function Owner() {
  const users = getData('users')
  const subscriptions = getData('subscriptions')
  const deliveries = getData('deliveries')
  const bills = getData('bills')
  const orders = getData('orders')
  const customers = users.filter((item) => item.role === 'Customer').length
  const earnings = bills.filter((item) => item.paymentStatus === 'Paid').reduce((sum, item) => sum + Number(item.total), 0)
  const pending = deliveries.filter((item) => item.status === 'Pending').length
  const stats = [
    { label: 'Customers', value: customers, icon: Users },
    { label: 'Subscriptions', value: subscriptions.length, icon: Milk },
    { label: 'One-time orders', value: orders.length, icon: ShoppingBag },
    { label: 'Deliveries', value: deliveries.length, icon: Truck },
    { label: 'Paid earnings', value: `₹${earnings}`, icon: Wallet },
    { label: 'Pending deliveries', value: pending, icon: Clock3 }
  ]

  return (
    <section className="container page"><span className="eyebrow">OWNER CONTROL CENTRE</span><h1>Dashboard overview</h1><p className="muted">Manage your farm's daily milk operations.</p>
      <div className="owner-stats">{stats.map((item) => { const Icon = item.icon; return <div className="panel" key={item.label}><span className="stat-icon"><Icon size={20} /></span><p>{item.label}</p><strong>{item.value}</strong></div> })}</div>
      <div className="owner-menu"><Link to="/owner/products"><Milk /><div><b>Manage products</b><span>Add products, change price and stock</span></div></Link><Link to="/owner/subscriptions"><Users /><div><b>Manage customers & subscriptions</b><span>Review customer plans and update status</span></div></Link><Link to="/owner/orders"><ShoppingBag /><div><b>Manage one-time orders</b><span>Confirm orders and update delivery/payment status</span></div></Link><Link to="/deliveries"><Truck /><div><b>Manage deliveries</b><span>Assign delivery partners and update status</span></div></Link><Link to="/bills"><Wallet /><div><b>Monthly bills</b><span>Review bills and payment status</span></div></Link></div>
    </section>
  )
}

export default Owner
