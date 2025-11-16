import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

export default function Projects({ projects }) {
  return (
    <section className='mt-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-semibold'>Selected Projects</h2>
          <p className='text-sm text-slate-500 mt-1'>Production-ready work, scaled for users.</p>
        </div>
      </div>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
        {projects.map(p=> (
          <motion.article whileHover={{ translateY: -6 }} key={p.id} className='p-5 rounded-xl border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm'>
            <div className='flex items-start justify-between'>
              <div>
                <h3 className='font-semibold text-lg'>{p.title}</h3>
                <p className='text-sm mt-2 text-slate-600 dark:text-slate-300'>{p.description}</p>
                <div className='mt-3'>
                  {p.tags.map(t=> <span key={t} className='inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 mr-2'>{t}</span>)}
                </div>
              </div>
              <div className='flex flex-col items-end gap-2'>
                {p.repo ? <a href={p.repo} target='_blank' rel='noreferrer' className='text-sm inline-flex items-center gap-2'><Github size={14}/> Repo</a> : null}
                {p.live ? <a href={p.live} target='_blank' rel='noreferrer' className='text-sm inline-flex items-center gap-2'><ExternalLink size={14}/> Live</a> : null}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
