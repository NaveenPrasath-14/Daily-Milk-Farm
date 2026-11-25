
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, ShieldCheck, Clock3, Search } from 'lucide-react'
import { getData } from '../services/storage'
import ProductCard from '../components/ProductCard'
import './Home.css'

function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const products = getData('products')
  const categories = ['All', 'Cow Milk', 'Buffalo Milk', 'Curd', 'Ghee', 'Buttermilk', 'Paneer', 'Cheese', 'Badam Milk', 'Coconut Milk']

  const filtered = products.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(search.toLowerCase())
    const categoryMatch = category === 'All' || item.category === category
    return nameMatch && categoryMatch
  })

  return (
    <>
      <section className="farm-hero">
        <div className="container farm-hero-inner">
          <div className="hero-text">
            <span className="eyebrow">PURE · FRESH · FARM TO HOME</span>
            <h1>Discover the purest taste of <em>nature.</em></h1>
            <p>Fresh milk, delicious dairy and a little farm goodness delivered to your doorstep every morning.</p>
            <div className="hero-buttons">
              <Link to="/subscribe" className="green-btn">Subscribe Now</Link>
              <Link to="/products" className="hero-link">View Products</Link>
            </div>
            <div className="hero-features">
              <span><ShieldCheck size={17} /> Quality checked</span>
              <span><Clock3 size={17} /> Daily freshness</span>
            </div>
          </div>
          <div className="hero-cow">
            <img src={`${import.meta.env.BASE_URL}images/cute_cow.png`} alt="Happy farm cow" />
          </div>
        </div>
      </section>

      <section className="container page home-products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM OUR FARM</span>
            <h1>Freshness for your family</h1>
            <p className="muted">Choose your daily dairy essentials.</p>
          </div>
          <Link to="/products" className="hero-link">See all products →</Link>
        </div>

        <div className="home-search">
          <Search size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search milk, curd, ghee..." />
        </div>

        <div className="pills">
          {categories.map((item) => (
            <button className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="grid-3">
          {filtered.slice(0, 6).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        {filtered.length === 0 && <div className="empty">No products found.</div>}
      </section>

      <section className="farm-promise">
        <div className="container promise-grid">
          <div>
            <img src={`${import.meta.env.BASE_URL}images/fresh milk.png`} alt="Fresh milk" />
            <h3>Fresh Milk</h3>
            <p>Carefully collected and quality checked every day.</p>
          </div>
          <div>
            <img src={`${import.meta.env.BASE_URL}images/curd-pouch.png`} alt="Fresh curd" />
            <h3>Farm Fresh Curd</h3>
            <p>Enjoy thick, tasty and healthy homemade curd.</p>
          </div>
          <div>
            <img src={`${import.meta.env.BASE_URL}images/delivery-pic.png`} alt="Delivery" />
            <h3>Safe Delivery</h3>
            <p>Our team delivers fresh products right to your door.</p>
          </div>
        </div>
      </section>

      <section className="container page how">
        <span className="eyebrow">EASY AS ONE, TWO, THREE</span>
        <h1>How it works</h1>
        <div className="grid-3">
          <div><b>01</b><h3>Choose your dairy</h3><p>Pick your favourite fresh milk or dairy product.</p></div>
          <div><b>02</b><h3>Set your schedule</h3><p>Choose quantity, dates and morning or evening delivery.</p></div>
          <div><b>03</b><h3>Enjoy freshness</h3><p>Our delivery partner brings your order to your home.</p></div>
        </div>
      </section>

      <section className="delivery-banner">
        <div className="container">
          <Truck size={30} />
          <div>
            <strong>Fresh delivery, every day</strong>
            <span>Morning 5:00 AM – 8:00 AM · Evening 5:00 PM – 7:00 PM</span>
          </div>
          <Link to="/subscribe" className="light-btn">Start subscription</Link>
        </div>
      </section>
    </>
  )
}

export default Home