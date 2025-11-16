import React from 'react'
import { motion } from 'framer-motion'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }

export default function Experience({ items }) {
  return (
    <motion.div variants={container} initial='hidden' animate='visible' className='mt-6'>
      <h2 className='text-lg font-semibold'>Experience</h2>
      <div className='mt-4 space-y-4'>
        {items.map((e, idx) => (
          <motion.div variants={item} key={e.company+e.role} className='p-4 rounded-lg bg-white dark:bg-slate-900 border dark:border-slate-800'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='font-semibold'>{e.role}</div>
                <div className='text-sm text-slate-500'>{e.company}</div>
              </div>
              <div className='text-sm text-slate-500'>{e.start} — {e.end}</div>
            </div>
            <ul className='mt-2 ml-4 list-disc text-sm text-slate-600 dark:text-slate-300'>
              {e.bullets.map((b,i)=><li key={i}>{b}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
