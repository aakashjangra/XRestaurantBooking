import { useState } from 'react'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import RestaurantCard from '../components/RestaurantCard'

const API = 'https://restaurantdata.onrender.com'

export default function Home() {
  const [results, setResults] = useState(null)
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  const search = async (state, city) => {
    setLoading(true)
    setCity(city)
    try {
      const res = await fetch(`${API}/restaurants?state=${state}&city=${city}`)
      setResults(await res.json())
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Hero />
      <section className="container">
        <SearchBar onSearch={search} />
        {loading && <p>Loading... (the server may take up to a minute)</p>}
        {results && !loading && (
          <>
            <h1>{results.length} restaurants available in {city}</h1>
            {results.map((r, i) => <RestaurantCard key={i} restaurant={r} />)}
          </>
        )}
      </section>
    </main>
  )
}