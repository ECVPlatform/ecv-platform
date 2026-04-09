'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CHAPTERS } from '@/lib/data'
import {
  BackLink,
  Hr,
  Label,
  BtnPrimary,
  BtnGhost,
  BottomNav,
  Toast,
  useToast,
} from '@/components/ui'

const OTF_IMAGES = [
  'https://static.wixstatic.com/media/8fa6c9_a61f79c6348a4e4d9ea3fe6ac48c4139~mv2.jpg',
  'https://static.wixstatic.com/media/8fa6c9_9e3ce218de074a75beb32c6f3f1db9bef003.jpg',
  'https://static.wixstatic.com/media/8fa6c9_21a289eda13f4ea6a1fc0c33e90e3c7c~mv2.jpg',
  'https://static.wixstatic.com/media/8fa6c9_68c6a4a2b4f74b289f25975fc2f28904~mv2.jpg',
  'https://static.wixstatic.com/media/8fa6c9_fce2eb41e73e42368ffa98630e45065f~mv2.jpg',
]

const TIMELINE = [
  { time: '05:30', event: 'Private pickup from your hotel' },
  { time: '07:00', event: 'Arrival at the river, western Tokyo' },
  { time: '07:30', event: 'Fishing begins - native wild trout' },
  { time: '11:30', event: 'Riverside omakase bento' },
  { time: '16:00', event: 'Return to your hotel' },
]

const INCLUDED = [
  'Private hotel pickup and return',
  'English-speaking host throughout',
  'Premium fly fishing equipment (Orvis)',
  'Riverside omakase bento lunch',
  'Professional photographs delivered after',
  'No prior experience needed',
]

const NOT_INCLUDED = [
  'A group tour or fishing lesson',
  'Rushed, crowded, or scripted',
  'A curated photo opportunity',
]

const HOTELS = ['Ritz-Carlton Tokyo', 'The Peninsula', 'Mandarin Oriental', 'Fairmont', 'Pullman Tokyo']

export default function ChapterPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const toast = useToast()
  const chapter = CHAPTERS.find(c => c.id === id)

  if (!chapter) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6 bg-parchment">
        <p className="font-serif text-2xl text-ink mb-2">Chapter not found.</p>
        <button onClick={() => router.push('/registry')} className="font-sans text-sm text-tobacco underline bg-none border-none cursor-pointer">
          Browse the registry →
        </button>
      </div>
    )
  }

  // For non-OTF chapters, show a "coming soon" state
  if (!chapter.detail) {
    return (
      <div className="flex flex-col flex-1 bg-parchment">
        <BackLink href="/registry" />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-sans text-[8px] text-fog mb-3" style={{ letterSpacing: '.18em', textTransform: 'uppercase' }}>{chapter.num}</p>
          <h2 className="font-serif text-3xl text-ink mb-2" style={{ lineHeight: '1.2' }}>{chapter.title}</h2>
          <p className="font-sans font-light text-xs text-tobacco mb-6">{chapter.line}</p>
          <p className="font-sans font-light text-xs text-ink/40" style={{ lineHeight: '1.8' }}>
            This experience is currently in the registry — reviewed before it appears.<br />
            Interested? Let us know.
          </p>
          <button
            onClick={() => toast.show('Interest noted. We\'ll be in touch.')}
            className="mt-6 font-sans font-light text-[11px] text-ink px-6 py-3 rounded-full bg-none cursor-pointer"
            style={{ border: '0.5px solid rgba(26,25,22,.16)', letterSpacing: '.07em' }}
          >
            Register interest
          </button>
        </div>
        <Toast message={toast.msg} visible={toast.visible} />
      </div>
    )
  }

  // Full OTF detail
  return (
    <div className="flex flex-col flex-1 bg-parchment">
      {/* Hero image */}
      <div className="relative flex-shrink-0" style={{ height: '250px' }}>
        <Image
          src="https://static.wixstatic.com/media/8fa6c9_c515ab241d004d6fb99252f87b0f2227~mv2.jpg"
          alt="On The Fly"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 38%' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(10,14,8,.18) 0%,rgba(10,14,8,0) 50%)' }} />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-5 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: 'rgba(10,14,8,.32)' }}
        >
          <div style={{ width: '8px', height: '8px', borderLeft: '1.5px solid rgba(240,237,232,.75)', borderBottom: '1.5px solid rgba(240,237,232,.75)', transform: 'rotate(45deg) translate(1px,0)' }} />
        </button>
        <span className="absolute top-4 right-4 font-sans font-light text-[8px] text-parchment/36 px-2.5 py-1 rounded-full" style={{ letterSpacing: '.14em', textTransform: 'uppercase', background: 'rgba(10,14,8,.3)', border: '0.5px solid rgba(240,237,232,.13)' }}>
          Chapter 001
        </span>
        <span className="absolute bottom-3.5 right-4 font-serif font-normal text-[11px] text-parchment/26" style={{ letterSpacing: '.2em', textTransform: 'uppercase' }}>
          on the fly
        </span>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <BackLink href="/home" />

        <div className="px-6 py-5">
          <p className="font-sans font-light text-[8px] text-fog" style={{ letterSpacing: '.14em', textTransform: 'uppercase' }}>
            Nature · Akigawa Valley · Western Tokyo
          </p>
          <h1 className="font-serif font-normal text-[28px] text-ink mt-1" style={{ lineHeight: '1.15' }}>
            A wild trout,<br />before Tokyo wakes.
          </h1>
          <p className="font-sans font-light text-[11px] text-tobacco mt-1">Private fly fishing · Available upon request</p>

          <Hr />
          <Label>What it is</Label>
          <p className="font-sans font-light text-xs text-ink/63" style={{ lineHeight: '1.88' }}>
            A private morning on mountain rivers where wild trout still rise — just beyond Tokyo's skyline. Your host handles everything. You simply arrive.
          </p>
          <Hr />
          <Label>At a glance</Label>
          <div className="flex mb-4">
            {[{ n: '~10', u: 'hours' }, { n: '1–2', u: 'guests' }, { n: '1', u: 'party/day' }].map((s, i) => (
              <div key={i} className="flex-1 pr-3.5 mr-3.5" style={{ borderRight: i < 2 ? '0.5px solid rgba(26,25,22,.08)' : 'none' }}>
                <div className="font-serif font-normal text-[22px] text-ink">{s.n}</div>
                <div className="font-sans font-light text-[9px] text-tobacco mt-0.5">{s.u}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            {[{ l: 'Season', v: 'March – October' }, { l: 'Level', v: 'Any' }].map(s => (
              <div key={s.l} className="flex-1 rounded-xl p-2.5 px-3" style={{ background: 'rgba(139,115,85,.08)' }}>
                <div className="font-sans font-light text-[8px] text-fog" style={{ letterSpacing: '.12em', textTransform: 'uppercase' }}>{s.l}</div>
                <div className="font-serif font-normal text-sm text-ink mt-0.5">{s.v}</div>
              </div>
            ))}
          </div>

          <Label>Your day</Label>
          {TIMELINE.map(tl => (
            <div key={tl.time} className="flex gap-3 items-start py-1.5">
              <span className="font-sans font-light text-[9px] text-tobacco w-10 flex-shrink-0">{tl.time}</span>
              <div className="w-1 h-1 rounded-full bg-tobacco/26 mt-1 flex-shrink-0" />
              <span className="font-sans font-light text-xs text-ink" style={{ lineHeight: '1.5' }}>{tl.event}</span>
            </div>
          ))}
        </div>

        {/* Photo strip */}
        <div className="flex gap-2 px-6 overflow-x-auto no-scrollbar my-1">
          {OTF_IMAGES.map((src, i) => (
            <div key={i} className="relative flex-shrink-0 rounded-xl overflow-hidden" style={{ width: '76px', height: '96px' }}>
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>

        <div className="px-6 py-4">
          <div style={{ marginTop: '4px' }}>
            <Hr />
          </div>
          <Label>What's included</Label>
          <ul className="list-none">
            {INCLUDED.map(item => (
              <li key={item} className="font-sans font-light text-[11px] text-ink/62 py-1.5 pl-4 relative" style={{ borderBottom: '0.5px solid rgba(26,25,22,.06)' }}>
                <span className="absolute left-0 text-tobacco" style={{ fontSize: '9px', top: '7px' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Hr />
          <Label>What it is not</Label>
          <ul className="list-none">
            {NOT_INCLUDED.map(item => (
              <li key={item} className="font-sans font-light text-[11px] text-ink/34 py-1 pl-3 relative">
                <span className="absolute left-0 text-fog">—</span>
                {item}
              </li>
            ))}
          </ul>
          <Hr />
          <Label>Your host</Label>
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
              <Image src="https://static.wixstatic.com/media/8fa6c9_6da49ef2b8c148d4917d096679ff1534~mv2.jpg" alt="Hiroyuki Oka" fill className="object-cover" />
            </div>
            <div>
              <div className="font-serif font-normal text-[16px] text-ink">Hiroyuki Oka</div>
              <div className="font-sans font-light text-[9px] text-tobacco mt-0.5" style={{ lineHeight: '1.55' }}>
                Founder & Host, On The Fly · Born in Tokyo<br />CNN, J.P. Morgan · English & Japanese
              </div>
            </div>
          </div>
          <Hr />
          <Label>Trusted by guests of</Label>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {HOTELS.map(h => (
              <span key={h} className="font-sans font-light text-[9px] text-ink/34 px-2.5 py-1 rounded-full" style={{ border: '0.5px solid rgba(26,25,22,.1)' }}>{h}</span>
            ))}
          </div>
        </div>

        {/* Quiet share prompt */}
        <div
          onClick={() => {
            if (navigator.share) navigator.share({ title: 'ECV — On The Fly', url: 'https://ecvproject.com/chapter/ch001' }).catch(() => {})
            else toast.show('ecvproject.com/chapter/ch001')
          }}
          className="flex items-center justify-between px-4 py-3 mx-6 mb-1 rounded-xl cursor-pointer"
          style={{ background: 'rgba(139,115,85,.06)' }}
        >
          <p className="font-sans font-light text-[11px] text-ink/50" style={{ lineHeight: '1.55' }}>
            Know someone who would understand this day?
          </p>
          <span className="text-fog text-sm">›</span>
        </div>

        {/* ECV brand block */}
        <div
          onClick={() => router.push('/registry')}
          className="mx-6 mt-3 mb-2 bg-ink rounded-2xl p-5 cursor-pointer"
        >
          <p className="font-sans font-light text-[8px] text-parchment/16 mb-2" style={{ letterSpacing: '.2em', textTransform: 'uppercase' }}>
            Chapter 001 of a growing registry — ECV
          </p>
          <p className="font-serif italic text-[17px] text-parchment/68" style={{ lineHeight: '1.45' }}>
            On The Fly is the first. The registry holds many more — each one reviewed before it appears.
          </p>
          <p className="font-sans font-light text-[11px] text-parchment/26 mt-2" style={{ lineHeight: '1.7' }}>
            Every experience becomes a Memoir — a private record of what it meant, written by you. Not a review. Not a rating.
          </p>
          <span className="font-sans font-light text-[10px] text-parchment/30 mt-3 block" style={{ letterSpacing: '.05em' }}>
            Browse the full registry →
          </span>
        </div>
        <div className="h-2" />
      </div>

      {/* CTA */}
      <div className="px-6 pb-8 flex-shrink-0">
        <BtnPrimary onClick={() => router.push(`/chapter/${id}/request`)}>
          Request this experience
        </BtnPrimary>
        <BtnGhost onClick={() => router.push('/gift')}>Give this as a gift →</BtnGhost>
      </div>

      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  )
}