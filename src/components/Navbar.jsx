
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LogOut, Menu, X } from 'lucide-react'
import './Navbar.css'

function Navbar({ user, logoutUser }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img
            src={`${import.meta.env.BASE_URL}images/my-farm.png`}
            alt="Daily Milk Farm"
          />
          <span>Daily <b>Milk Farm</b></span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
          {user && user.role === 'Customer' && <NavLink to="/my-subscriptions" onClick={closeMenu}>My Plans</NavLink>}
          {user && user.role === 'Customer' && <NavLink to="/my-orders" onClick={closeMenu}>My Orders</NavLink>}
          {user && user.role === 'Customer' && <NavLink to="/my-deliveries" onClick={closeMenu}>Deliveries</NavLink>}
          {user && user.role === 'Delivery Boy' && <NavLink to="/deliveries" onClick={closeMenu}>Delivery List</NavLink>}
          {user && user.role === 'Owner' && <NavLink to="/owner" onClick={closeMenu}>Dashboard</NavLink>}
          {user && <NavLink to="/bills" onClick={closeMenu}>Bills</NavLink>}

          <div className="mobile-nav-user">
            {user ? (
              <>
                <span>{user.name}</span>
                <button onClick={() => { logoutUser(); closeMenu() }}>
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>Login</Link>
                <Link className="nav-signup" to="/register" onClick={closeMenu}>Sign Up</Link>
              </>
            )}
          </div>
        </nav>

        <div className="nav-user desktop-nav-user">
          {user ? (
            <>
              <span>{user.name}</span>
              <button onClick={logoutUser}><LogOut size={16} /> Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link className="nav-signup" to="/register">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar