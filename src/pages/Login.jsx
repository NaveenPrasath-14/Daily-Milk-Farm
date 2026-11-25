import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getData } from '../services/storage'
import './Login.css'

function Login({ loginUser }) {
  const [email, setEmail] = useState('customer@test.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function submit(event) {
    event.preventDefault()
    const users = getData('users')
    const found = users.find((item) => item.email === email && item.password === password)
    if (!found) {
      setError('Email or password is incorrect.')
      return
    }
    loginUser(found)
    if (found.role === 'Owner') navigate('/owner')
    else if (found.role === 'Delivery Boy') navigate('/deliveries')
    else navigate('/')
  }

  return (
    <section className="auth-bg">
      <form className="form-card auth-card" onSubmit={submit}>
        <span className="eyebrow">WELCOME TO OUR FARM</span><h1>Login to your account</h1><p className="muted">Your daily freshness is just one step away.</p>
        <div className="field"><label>Email</label><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
        <div className="field"><label>Password</label><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
        {error && <p className="error">{error}</p>}
        <button className="green-btn auth-submit">Login</button>
        <p className="auth-bottom">New here? <Link to="/register">Create account</Link></p>
        <div className="demo-login"><b>Demo accounts</b><span>Customer: customer@test.com</span><span>Owner: owner@test.com</span><span>Delivery: delivery@test.com</span><span>Password: 123456</span></div>
      </form>
    </section>
  )
}

export default Login
