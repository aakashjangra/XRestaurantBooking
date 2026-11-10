import { useState } from 'react'
import BookingPanel from './BookingPanel'

// API keys may be "Restaurant Name" style or camelCase; handle both
const pick = (r, ...keys) => keys.map((k) => r[k]).find((v) => v !== undefined)

export default function RestaurantCard({ restaurant }) {
  const [open, setOpen] = useState(false)
  const info = {
    restaurantName: pick(restaurant, 'Restaurant Name', 'restaurantName', 'name'),
    address: pick(restaurant, 'Address', 'address'),
    city: pick(restaurant, 'City', 'city'),
    state: pick(restaurant, 'State', 'state'),
    rating: pick(restaurant, 'Overall Rating', 'overallRating', 'rating'),
  }

  return (
    <div className="card">
      <div className="card-top">
        <div>
          <h3>{info.restaurantName}</h3>
          <p className="muted">{info.address}, {info.city}, {info.state}</p>
        </div>
        <div className="rating">{info.rating}</div>
      </div>
      <button className="btn" onClick={() => setOpen((o) => !o)}>
        Book FREE Reservation
      </button>
      {open && <BookingPanel info={info} onDone={() => setOpen(false)} />}
    </div>
  )
}