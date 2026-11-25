
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://daily-milk-farm.onrender.com'
})

const keys = ['users', 'products', 'subscriptions', 'deliveries', 'bills', 'orders']

export async function initializeData() {
  for (const key of keys) {
    const response = await api.get(`/${key}`)
    localStorage.setItem(key, JSON.stringify(response.data))
  }
}

export function getData(key) {
  const saved = localStorage.getItem(key)
  if (saved) return JSON.parse(saved)
  return []
}

export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function addData(key, item) {
  const list = getData(key)
  const newItem = { ...item, id: `${key}-${Date.now()}` }
  saveData(key, [...list, newItem])
  api.post(`/${key}`, newItem).catch((error) => console.error(error))
  return newItem
}

export function updateData(key, id, changes) {
  const list = getData(key)
  const oldItem = list.find((item) => String(item.id) === String(id))
  const updatedItem = { ...oldItem, ...changes }
  const updated = list.map((item) => String(item.id) === String(id) ? updatedItem : item)
  saveData(key, updated)
  api.patch(`/${key}/${id}`, changes).catch((error) => console.error(error))
}

export function deleteData(key, id) {
  const updated = getData(key).filter((item) => String(item.id) !== String(id))
  saveData(key, updated)
  api.delete(`/${key}/${id}`).catch((error) => console.error(error))
}