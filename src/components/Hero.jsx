import React from 'react'
import { motion } from 'framer-motion'
import { DownloadCloud } from 'lucide-react'

export default function Hero({ data }) {
  return (
    <motion.section initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 shadow-md relative overflow-hidden'>
      <div className='flex items-start gap-4'>
        <div className='w-20 h-20 flex-none rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white text-xl font-semibold'>
          {data.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
        </div>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>{data.name}</h1>
          <p className='text-sm opacity-90'>{data.title}</p>
          <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>{data.location}</p>
          <p className='mt-4 text-sm leading-relaxed'>{data.about}</p>
          <div className='mt-4 flex gap-2'>
            <a href={data.resumeUrl} download className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm hover:opacity-95'>
              <DownloadCloud size={16} /> Download Resume
            </a>
            <a href={`mailto:${data.social.email}`} className='inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm'>Email</a>
          </div>
        </div>
      </div>

      {/* Lottie animation placed top-right */}
      <div className='absolute top-0 right-0 w-36 h-36 md:w-48 md:h-48 pointer-events-none'>
        {/* using lottie-player web component via CDN */}
        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_tfb3estd.json" background="transparent" speed="1" style={{ width: '100%', height: '100%' }} loop autoplay />
      </div>
    </motion.section>
  )
}
