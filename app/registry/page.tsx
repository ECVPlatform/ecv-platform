'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BackLink, FilterChips, ChapterRow, BottomNav, Toast, useToast } from '@/components/ui'
import { CHAPTERS } from '@/lib/data'
import type { Chapter } from '@/types'

const FILTER_OPTIONS = [
  { id: 'all',      label: 'All' },
  { id: 'nature',   label: 'Nature' },
  { id: 'culinary', label: 'Culinary' },
  { id: 'creative', label: 'Creative' },
  { id: 'family',   label: 'Family' },
  { id: 'connect',  label: 'Reconnect' },
]

export default function RegistryPage() {
  const router  = useRouter()
  const toast   = useToast()
  const [filter, setFilter] = useState('all')

  const filtered: Chapter[] = filter === 'all'
    ? CHAPTERS
    : CHAPTERS.filter(c => c.cat === filter)

  const handleClick = (ch: Chapter) => {
    if (ch.detail) router.push(`/chapter/${ch.id}`)
    else toast.show(`${ch.stTxt} — details coming soon.`)
  }

  return (
    <div className="flex flex-col flex-1 bg-parchment">
      <BackLink href="/home" />
      <div className="px-6 pt-4 pb-2 flex-shrink-0">
        <h1 className="font-serif font-normal text-[25px] text-ink">The Registry.</h1>
        <p className="font-sans font-light text-[11px] text-tobacco mt-1">Showing 10 from a growing collection.</p>
      </div>
      <p className="font-sans font-light text-[10px] text-ink/30 px-6 pb-3 flex-shrink-0" style={{ lineHeight: '1.6' }}>
        No feed. No algorithm. Ordered by chapter — not by popularity.
      </p>

      <FilterChips options={FILTER_OPTIONS} active={filter} onChange={setFilter} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
        {filtered.map(ch => (
          <ChapterRow key={ch.id} chapter={ch} onClick={() => handleClick(ch)} />
        ))}
        <p className="font-sans font-light text-[10px] text-ink/30 text-center py-4" style={{ lineHeight: '1.6' }}>
          More experiences are held in the registry — each one reviewed before it appears.<br />
          The registry is designed to grow to 100+ experiences without ever becoming a feed.
        </p>
      </div>

      <BottomNav active="discover" />
      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  )
}
