import './ManageProducts.css'
import { useState } from 'react'
import './Owner.css'
import { getData, addData, updateData, deleteData } from '../services/storage'

const blank = { name: '', category: 'Cow Milk', pricePerLitre: '', rating: '4.5', stock: '', image: '/images/fresh milk.png', description: '' }

function ManageProducts() {
  const [items, setItems] = useState(getData('products'))
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState('')

  function refresh() { setItems(getData('products')) }
  function change(event) { const { name, value } = event.target; setForm({ ...form, [name]: value }) }

  function submit(event) {
    event.preventDefault()
    const data = { ...form, pricePerLitre: Number(form.pricePerLitre), rating: Number(form.rating), stock: Number(form.stock) }
    if (editId) updateData('products', editId, data)
    else addData('products', data)
    setForm(blank)
    setEditId('')
    refresh()
  }

  function edit(item) { setForm({ ...item }); setEditId(item.id) }
  function remove(id) { if (!window.confirm('Delete this product?')) return; deleteData('products', id); refresh() }

  return (
    <section className="container page"><span className="eyebrow">FARM CATALOGUE</span><h1>Manage products</h1>
      <form className="form-card admin-form" onSubmit={submit}><h3>{editId ? 'Edit product' : 'Add new product'}</h3><div className="grid-2">
        <div className="field"><label>Name</label><input name="name" value={form.name} onChange={change} required /></div>
        <div className="field"><label>Category</label><select name="category" value={form.category} onChange={change}>{['Cow Milk','Buffalo Milk','Curd','Ghee','Buttermilk','Paneer','Cheese','Badam Milk','Coconut Milk'].map((item) => <option key={item}>{item}</option>)}</select></div>
        <div className="field"><label>Price</label><input type="number" name="pricePerLitre" value={form.pricePerLitre} onChange={change} required /></div>
        <div className="field"><label>Stock</label><input type="number" name="stock" value={form.stock} onChange={change} required /></div>
        <div className="field"><label>Rating</label><input type="number" step="0.1" name="rating" value={form.rating} onChange={change} /></div>
        <div className="field"><label>Image path</label><input name="image" value={form.image} onChange={change} /></div>
      </div><div className="field"><label>Description</label><textarea name="description" rows="2" value={form.description} onChange={change} /></div><button className="green-btn">{editId ? 'Update product' : 'Add product'}</button>{editId && <button type="button" className="light-btn" onClick={() => { setEditId(''); setForm(blank) }}>Cancel</button>}</form>
      <div className="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.category}</td><td>₹{item.pricePerLitre}</td><td>{item.stock}</td><td><button className="light-btn" onClick={() => edit(item)}>Edit</button> <button className="red-btn" onClick={() => remove(item.id)}>Delete</button></td></tr>)}</tbody></table></div>
    </section>
  )
}

export default ManageProducts
