import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addData, getData } from '../services/storage'
import './Register.css'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '', role: 'Customer' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function change(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  function submit(event) {
    event.preventDefault()
    const users = getData('users')
    const exists = users.find((item) => item.email === form.email)
    if (exists) {
      setError('This email is already registered.')
      return
    }
    addData('users', form)
    navigate('/login')
  }

  return (
    <section className="auth-bg">
      <form className="form-card auth-card" onSubmit={submit}>
        <span className="eyebrow">JOIN OUR FARM FAMILY</span><h1>Create your account</h1>
        <div className="field"><label>Full name</label><input name="name" value={form.name} onChange={change} required /></div>
        <div className="grid-2">
          <div className="field"><label>Email</label><input name="email" type="email" value={form.email} onChange={change} required /></div>
          <div className="field"><label>Password</label><input name="password" type="password" minLength="6" value={form.password} onChange={change} required /></div>
          <div className="field"><label>Phone</label><input name="phone" value={form.phone} onChange={change} required /></div>
          <div className="field"><label>Role</label><select name="role" value={form.role} onChange={change}><option>Customer</option><option>Owner</option><option>Delivery Boy</option></select></div>
        </div>
        <div className="field"><label>Address</label><textarea name="address" rows="3" value={form.address} onChange={change} required /></div>
        {error && <p className="error">{error}</p>}
        <button className="green-btn auth-submit">Create account</button>
        <p className="auth-bottom">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </section>
  )
}

export default Register
