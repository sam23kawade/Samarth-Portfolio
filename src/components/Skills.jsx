import React from 'react'
import { motion } from 'framer-motion'

export default function Skills({ skills }) {
  return (
    <section className='mt-6 p-4 rounded-lg bg-gray-50 dark:bg-slate-800 border dark:border-slate-700'>
      <h2 className='text-lg font-semibold'>Top skills</h2>
      <div className='mt-3'>
        {skills.map(s => (
          <div key={s.name} className='mb-3'>
            <div className='flex justify-between text-xs'>
              <span>{s.name}</span>
              <span>{s.level}%</span>
            </div>
            <div className='w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-1 overflow-hidden'>
              <motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 1.1 }} className='h-2 rounded-full' style={{ background: 'linear-gradient(90deg,#7c3aed,#06b6d4)' }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
