import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">XRestaurant</NavLink>
      <div className="links">
        <NavLink to="/">Find Restaurants</NavLink>
        <NavLink to="/">Locations</NavLink>
        <NavLink to="/my-bookings">My Bookings</NavLink>
      </div>
    </nav>
  )
}