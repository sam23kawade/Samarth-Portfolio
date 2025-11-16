import React from 'react'

export default function Footer({ name }) {
  return <footer className='mt-8 text-sm text-slate-500'>© {new Date().getFullYear()} {name} — Built with ❤️</footer>
}
