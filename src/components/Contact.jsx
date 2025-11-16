import React from 'react'
import { Mail } from 'lucide-react'

export default function Contact({ email }) {
  return (
    <div className='mt-8 p-6 rounded-xl bg-white dark:bg-slate-900 border dark:border-slate-800'>
      <h2 className='text-lg font-semibold'>Contact</h2>
      <p className='text-sm text-slate-500 mt-2'>Want to collaborate or interview? Drop a line.</p>
      <form className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-3' onSubmit={(e)=>{
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        const subject = encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`)
        const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nMessage:\n${data.get('message')}`)
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
      }}>
        <input name='name' required placeholder='Name' className='p-3 rounded-lg border' />
        <input name='email' required placeholder='Email' className='p-3 rounded-lg border' />
        <textarea name='message' required placeholder='Message' className='md:col-span-2 p-3 rounded-lg border h-32' />
        <button type='submit' className='md:col-span-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white'><Mail size={16}/> Send message</button>
      </form>
    </div>
  )
}
