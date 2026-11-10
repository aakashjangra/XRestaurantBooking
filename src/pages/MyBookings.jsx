import { useState } from 'react'

export default function MyBookings() {
  const [bookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bookings') || '[]') } catch { return [] }
  })

  return (
    <main className="container">
      <h1>My Bookings</h1>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map((b, i) => (
        <div className="card" key={i}>
          <h3>{b.restaurantName}</h3>
          <p className="muted">{b.address}</p>
          <p>Rating: {b.rating}</p>
          <p>{new Date(b.bookingDate).toDateString()} at {b.bookingTime}</p>
          <p className="muted">{b.bookingEmail}</p>
        </div>
      ))}
    </main>
  )
}