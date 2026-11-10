import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  'Book tables at top restaurants',
  'Free reservations, any day this week',
  'Find your next favourite place',
]

export default function Hero() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      loop
      className="hero"
    >
      {slides.map((s) => (
        <SwiperSlide key={s}>
          <div className="hero-slide"><h2>{s}</h2></div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}