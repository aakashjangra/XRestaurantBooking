import { useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const SLOTS = {
  Morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
  Afternoon: ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'],
  Evening: ['05:00 PM', '06:00 PM', '07:00 PM'],
}

export default function BookingPanel({ info, onDone }) {
  // next 7 days (today + 6) = "within a week"
  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() + i)
      return d
    })
  }, [])

  const [dayIdx, setDayIdx] = useState(0)
  const [time, setTime] = useState('')
  const [email, setEmail] = useState('')

  const label = (d, i) =>
    i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })

  const confirm = () => {
    if (!time || !email) return alert('Please choose a time and enter your email')
    const booking = {
      ...info,
      bookingDate: days[dayIdx].toISOString(),
      bookingTime: time,
      bookingEmail: email,
    }
    const existing = JSON.parse(localStorage.getItem('bookings') || '[]')
    localStorage.setItem('bookings', JSON.stringify([...existing, booking]))
    alert('Booking confirmed!')
    onDone()
  }

  return (
    <div className="booking">
      <Swiper slidesPerView="auto" spaceBetween={10}>
        {days.map((d, i) => (
          <SwiperSlide key={i} style={{ width: 'auto' }}>
            <div className={`chip ${i === dayIdx ? 'active' : ''}`} onClick={() => setDayIdx(i)}>
              <p>{label(d, i)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {Object.entries(SLOTS).map(([period, times]) => (
        <div key={period} className="slot-row">
          <p className="period">{period}</p>
          <div className="slots">
            {times.map((t) => (
              <span key={t} className={`chip ${t === time ? 'active' : ''}`} onClick={() => setTime(t)}>
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}

      <input type="email" placeholder="Your email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <button className="btn" onClick={confirm}>Confirm Booking</button>
    </div>
  )
}