import { useEffect, useState } from 'react'
import { Select, MenuItem } from '@mui/material'

const API = 'https://restaurantdata.onrender.com'

export default function SearchBar({ onSearch }) {
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    fetch(`${API}/states`).then((r) => r.json()).then(setStates).catch(() => {})
  }, [])

  useEffect(() => {
    if (!state) return
    setCity('')
    setCities([])
    fetch(`${API}/cities/${state}`).then((r) => r.json()).then(setCities).catch(() => {})
  }, [state])

  const submit = (e) => {
    e.preventDefault()
    if (state && city) onSearch(state, city)
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <Select id="state" value={state} displayEmpty fullWidth
        onChange={(e) => setState(e.target.value)}
        renderValue={(v) => v || 'State'}>
        {states.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
      </Select>

      <Select id="city" value={city} displayEmpty fullWidth
        onChange={(e) => setCity(e.target.value)}
        renderValue={(v) => v || 'City'}>
        {cities.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
      </Select>

      <button type="submit" id="searchBtn" className="btn">Search</button>
    </form>
  )
}