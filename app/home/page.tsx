'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  StatusBar, BottomNav, ChapterRow, FilterChips, Toast, useToast
} from '@/components/ui'
import { CHAPTERS, PERSONALIZATION, DEFAULT_PERSONALIZATION } from '@/lib/data'
import type { Chapter, PersonalizationEntry } from '@/types'

const FILTER_OPTIONS = [
  { id: 'all',      label: 'All' },
  { id: 'nature',   label: 'Nature' },
  { id: 'culinary', label: 'Culinary' },
  { id: 'creative', label: 'Creative' },
  { id: 'family',   label: 'Family' },
  { id: 'connect',  label: 'Reconnect' },
]

export default function HomePage() {
  const router = useRouter()
  const toast = useToast()
  const [p, setP] = useState<PersonalizationEntry>(DEFAULT_PERSONALIZATION)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const m = sessionStorage.getItem('ecv_moment') || ''
    setP(PERSONALIZATION[m] || DEFAULT_PERSONALIZATION)
  }, [])

  const featured = CHAPTERS.find(c => c.id === p.fc) || CHAPTERS[0]

  const listChapters = (): Chapter[] => {
    const list = p.homeIds
      .map(id => CHAPTERS.find(c => c.id === id))
      .filter(Boolean) as Chapter[]

    if (filter === 'all') return list
    return list.filter(c => c.cat === filter)
  }

  const handleChapterClick = (ch: Chapter) => {
    if (ch.detail) router.push(`/chapter/${ch.id}`)
    else toast.show(`${ch.stTxt} - details coming soon.`)
  }

  const handleFeaturedClick = () => {
    if (featured.detail) router.push(`/chapter/${featured.id}`)
    else toast.show(`${featured.stTxt} - details coming soon.`)
  }

  return (
    <div className="flex flex-col flex-1 bg-parchment">
      <StatusBar />

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-2.5 flex-shrink-0">
        <span
          className="font-sans font-light text-xs text-ink"
          style={{ letterSpacing: '.24em', textTransform: 'uppercase' }}
        >
          ECV
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/dashboard')}
            className="font-sans font-light text-[9px] text-ink/40 bg-transparent border-none cursor-pointer"
            style={{ letterSpacing: '.08em', textTransform: 'uppercase' }}
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push('/about')}
            className="w-7 h-7 rounded-full flex items-center justify-center font-serif italic text-xs cursor-pointer border-none"
            style={{ background: 'rgba(139,115,85,.2)', color: 'rgba(139,115,85,.55)' }}
          >
            H
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div className="px-6 pb-1.5 flex-shrink-0">
        <p className="font-serif italic text-[13px] text-tobacco">
          {(() => {
            const h = new Date().getHours()
            return h < 12 ? 'Good morning.' : h < 17 ? 'Good afternoon.' : 'Good evening.'
          })()}
        </p>

        <p
          className="font-serif font-normal text-[26px] text-ink mt-0.5"
          style={{ lineHeight: '1.18' }}
        >
          {p.greet}
        </p>
      </div>

      {/* Mode pills */}
      <div className="flex items-center px-6 pb-3 gap-2.5 flex-shrink-0">
        <div
          className="flex rounded-full p-0.5"
          style={{ background: 'rgba(26,25,22,.06)' }}
        >
          <span
            className="font-sans font-light text-[9px] rounded-full px-3.5 py-1.5 bg-ink text-parchment"
            style={{ letterSpacing: '.08em' }}
          >
            Discover
          </span>

          <button
            onClick={() => router.push('/hosts')}
            className="font-sans font-light text-[9px] rounded-full px-3.5 py-1.5 text-ink/36 bg-transparent border-none cursor-pointer"
            style={{ letterSpacing: '.08em' }}
          >
            Host
          </button>
        </div>

        <span className="flex-1 text-right font-sans font-light text-[9px] text-fog">
          Guest view
        </span>
      </div>

      {/* Filter chips */}
      <FilterChips options={FILTER_OPTIONS} active={filter} onChange={setFilter} />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Featured card */}
        <div
          onClick={handleFeaturedClick}
          className="mx-6 mb-3 rounded-2xl overflow-hidden relative cursor-pointer flex-shrink-0"
          style={{ height: '265px' }}
        >
          <Image
            src="https://static.wixstatic.com/media/8fa6c9_f12281f308d34c7189e1e3fafcb6832e~mv2.jpg"
            alt={featured.title}
            fill
            className="object-cover"
            style={{ objectPosition: 'center 55%' }}
          />

          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom,rgba(10,14,8,.04) 0%,rgba(10,14,8,.93) 100%)' }}
          />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div
              className="inline-block font-sans font-light text-[8px] text-parchment/30 px-2 py-0.5 rounded-full mb-2"
              style={{
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                background: 'rgba(240,237,232,.07)',
                border: '0.5px solid rgba(240,237,232,.12)',
              }}
            >
              {featured.num}
            </div>

            <p
              className="font-sans font-light text-[8px] text-parchment/30 mb-1"
              style={{ letterSpacing: '.15em', textTransform: 'uppercase' }}
            >
              {featured.cat.charAt(0).toUpperCase() + featured.cat.slice(1)} · {featured.loc}
            </p>

            <h3
              className="font-serif font-normal text-[24px] text-parchment"
              style={{ lineHeight: '1.18' }}
            >
              {featured.title}
            </h3>

            <div className="flex items-center gap-1.5 mt-2">
              <span className="font-sans font-light text-[9px] text-parchment/36">
                {featured.host}
              </span>
              <div className="w-0.5 h-0.5 rounded-full bg-parchment/22" />
              <span className="font-sans font-light text-[9px] text-parchment/36">
                {featured.season}
              </span>
            </div>

            <div
              className="inline-flex items-center gap-1 mt-2 font-sans font-light text-[8px] text-parchment/38 px-2.5 py-1 rounded-full"
              style={{ border: '0.5px solid rgba(240,237,232,.14)' }}
            >
              <div className="w-1 h-1 rounded-full bg-parchment/22" />
              <span style={{ letterSpacing: '.1em' }}>{featured.badge}</span>
            </div>
          </div>
        </div>

        {/* Platform bridge */}
        <div
          onClick={() => router.push('/registry')}
          className="mx-6 mb-3 bg-ink rounded-2xl p-4 cursor-pointer"
        >
          <p
            className="font-sans font-light text-[8px] text-parchment/20 mb-2"
            style={{ letterSpacing: '.18em', textTransform: 'uppercase' }}
          >
            {p.pb.eye}
          </p>

          <p
            className="font-serif italic text-[17px] text-parchment/65"
            style={{ lineHeight: '1.45' }}
          >
            {p.pb.t}
          </p>

          <p
            className="font-sans font-light text-[10px] text-parchment/26 mt-2.5"
            style={{ letterSpacing: '.05em' }}
          >
            {p.pb.act}
          </p>
        </div>

        {/* Registry count */}
        <div className="flex justify-between items-center px-6 mb-2">
          <span
            className="font-sans font-light text-[10px] text-ink/35"
            style={{ letterSpacing: '.04em' }}
          >
            Showing 10 · more being held in the registry
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="font-sans font-light text-[10px] text-ink/35 cursor-pointer bg-none border-none"
              style={{ letterSpacing: '.04em' }}
            >
              Dashboard
            </button>

            <button
              onClick={() => router.push('/registry')}
              className="font-sans font-light text-[10px] text-tobacco cursor-pointer bg-none border-none"
              style={{ letterSpacing: '.04em' }}
            >
              See all →
            </button>
          </div>
        </div>

        {/* Chapter list */}
        <div className="px-6">
          {listChapters().map(ch => (
            <ChapterRow
              key={ch.id}
              chapter={ch}
              onClick={() => handleChapterClick(ch)}
            />
          ))}
        </div>

        <p
          className="font-sans font-light text-[10px] text-ink/30 text-center px-6 py-4"
          style={{ lineHeight: '1.6' }}
        >
          More experiences are held in the registry - each one reviewed before it appears.
        </p>

        <div className="h-1.5" />
      </div>

      <BottomNav active="discover" />
      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  )
}