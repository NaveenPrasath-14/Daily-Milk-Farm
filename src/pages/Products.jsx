import './Products.css'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getData } from '../services/storage'

function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')
  let products = getData('products').filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(search.toLowerCase())
    const categoryMatch = category === 'All' || item.category === category
    return nameMatch && categoryMatch
  })
  if (sort === 'low') products = [...products].sort((a, b) => a.pricePerLitre - b.pricePerLitre)
  if (sort === 'high') products = [...products].sort((a, b) => b.pricePerLitre - a.pricePerLitre)

  return (
    <section className="container page">
      <span className="eyebrow">OUR FARM PRODUCTS</span><h1>Fresh dairy products</h1><p className="muted">Pure and fresh dairy essentials for every home.</p>
      <div className="toolbar"><input placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} /><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option><option>Cow Milk</option><option>Buffalo Milk</option><option>Curd</option><option>Ghee</option><option>Buttermilk</option><option>Paneer</option><option>Cheese</option><option>Badam Milk</option><option>Coconut Milk</option></select><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="default">Sort by price</option><option value="low">Low to High</option><option value="high">High to Low</option></select></div>
      <div className="grid-3">{products.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      {products.length === 0 && <div className="empty">No products match your search.</div>}
    </section>
  )
}

export default Products
