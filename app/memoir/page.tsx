'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BackLink, Label, BtnPrimary, BtnGhost, Toast, useToast } from '@/components/ui'
import type { Visibility } from '@/types'

const VIS_OPTIONS: { id: Visibility; title: string; sub: string }[] = [
  { id: 'private', title: 'Keep it',       sub: 'Private. Yours alone.' },
  { id: 'shared',  title: 'Share quietly', sub: 'One person. No feed.' },
  { id: 'gifted',  title: 'Give it',       sub: 'Gift the experience.' },
]

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function MemoirPage() {
  const router  = useRouter()
  const toast   = useToast()

  const [title,      setTitle]      = useState('')
  const [beforeText, setBeforeText] = useState('')
  const [afterText,  setAfterText]  = useState('')
  const [withWhom,   setWithWhom]   = useState('')
  const [visibility, setVisibility] = useState<Visibility>('private')
  const [loading,    setLoading]    = useState(false)
  const [dateStr,    setDateStr]    = useState('')

  useEffect(() => {
    const intention = sessionStorage.getItem('ecv_intention') || ''
    if (intention) setBeforeText(intention)
    const d = new Date()
    setDateStr(`${MONTHS[d.getMonth()]} ${d.getFullYear()}`)
  }, [])

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/memoir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter_id: 'ch001',
          title,
          before_text: beforeText,
          after_text:  afterText,
          with_whom:   withWhom,
          visibility,
        }),
      })
      if (!res.ok) throw new Error()
      toast.show('Memoir saved.')
      setTimeout(() => toast.show('Private, shared quietly, or kept forever.'), 2600)
      setTimeout(() => router.push('/home'), 5000)
    } catch {
      toast.show('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-parchment">
      <BackLink href="/home" />
      <div className="px-6 pt-5 pb-0 flex-shrink-0">
        <p className="font-sans font-light text-[9px] text-fog mb-2.5 a1" style={{ letterSpacing: '.2em', textTransform: 'uppercase' }}>Your Memoir</p>
        <h1 className="font-serif font-normal text-[28px] text-ink a2" style={{ lineHeight: '1.2' }}>
          Capture what<br />the day meant.
        </h1>
        <p className="font-sans font-light text-xs text-ink/40 mt-2 a3" style={{ lineHeight: '1.85' }}>
          A Memoir is what ECV makes with you. One per experience. Private by default.
        </p>
        <p className="font-sans font-light text-[10px] text-ink/28 mt-1 a3" style={{ lineHeight: '1.6' }}>
          Not a review. Not for anyone else unless you choose.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-6 pt-4">

          {/* Memoir card */}
          <div className="bg-ink rounded-2xl overflow-hidden mb-4 a3">
            {/* Photo placeholder */}
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              style={{ height: '130px', background: 'linear-gradient(150deg,#2a3020,#1a2015)' }}
              onClick={() => toast.show('Photo upload coming in Phase 2.')}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1" style={{ background: 'rgba(240,237,232,.09)', border: '0.5px solid rgba(240,237,232,.16)' }}>
                📷
              </div>
              <span className="font-sans font-light text-[9px] text-parchment/28" style={{ letterSpacing: '.1em' }}>Add a photo</span>
            </div>

            {/* Fields */}
            <div className="px-5 py-4">
              <p className="font-sans font-light text-[8px] text-parchment/16 mb-2.5" style={{ letterSpacing: '.2em', textTransform: 'uppercase' }}>ECV Memoir</p>
              <input
                className="w-full bg-transparent border-none border-b outline-none font-serif font-normal text-[20px] text-parchment/68 pb-2.5 mb-3"
                style={{ borderBottom: '0.5px solid rgba(240,237,232,.13)', color: 'rgba(240,237,232,.68)' }}
                placeholder="Name this experience..."
                value={title}
                onChange={e => setTitle(e.target.value)}
              />

              {[
                { label: 'What I wanted', value: beforeText, setter: setBeforeText, placeholder: 'What you wanted from the day...' },
                { label: 'What I found',  value: afterText,  setter: setAfterText,  placeholder: 'What actually happened. One or two lines.' },
              ].map(field => (
                <div key={field.label} className="py-2.5" style={{ borderBottom: '0.5px solid rgba(240,237,232,.07)' }}>
                  <p className="font-sans font-light text-[8px] text-parchment/16 mb-1" style={{ letterSpacing: '.14em', textTransform: 'uppercase' }}>{field.label}</p>
                  <textarea
                    className="w-full bg-transparent border-none outline-none font-sans font-light text-xs text-parchment/50 resize-none"
                    style={{ height: '44px', lineHeight: '1.6' }}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                  />
                </div>
              ))}

              <div className="flex justify-between items-center mt-3 pt-2.5" style={{ borderTop: '0.5px dashed rgba(240,237,232,.09)' }}>
                <input
                  className="bg-transparent border-none outline-none font-sans font-light text-[9px] text-parchment/22"
                  style={{ width: '150px' }}
                  placeholder="Who were you with?"
                  value={withWhom}
                  onChange={e => setWithWhom(e.target.value)}
                />
                <span className="font-sans font-light text-[9px] text-parchment/16">{dateStr}</span>
              </div>
            </div>
          </div>

          {/* Visibility */}
          <p className="font-sans font-light text-[9px] text-ink/35 mb-2.5 a4" style={{ lineHeight: '1.5' }}>
            What will you do with this Memoir?<br />Your choice shapes your ECV identity — not your public profile, but how you relate to what matters.
          </p>
          <div className="flex gap-2 mb-4 a4">
            {VIS_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setVisibility(opt.id)}
                className="flex-1 py-2.5 px-2 rounded-xl cursor-pointer transition-all text-center"
                style={{
                  border: visibility === opt.id ? '0.5px solid var(--ink)' : '0.5px solid rgba(26,25,22,.13)',
                  background: visibility === opt.id ? 'rgba(26,25,22,.05)' : 'transparent',
                }}
              >
                <span className="font-serif font-normal text-[13px] text-ink block mb-0.5">{opt.title}</span>
                <span className="font-sans font-light text-[9px] text-ink/38 block" style={{ lineHeight: '1.4' }}>{opt.sub}</span>
              </button>
            ))}
          </div>

          {/* Archive preview */}
          <div className="a4">
            <Label>Your ECV archive</Label>
            <div className="flex gap-2 mt-1 overflow-x-auto no-scrollbar pb-1">
              <div className="flex-shrink-0 rounded-xl flex flex-col justify-end p-2.5 bg-ink" style={{ width: '88px', height: '100px' }}>
                <div className="font-serif italic text-[11px] text-parchment/55" style={{ lineHeight: '1.3' }}>A morning on<br />the river</div>
                <div className="font-sans font-light text-[8px] text-parchment/20 mt-1">OTF · 2025</div>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-shrink-0 rounded-xl flex items-center justify-center" style={{ width: '88px', height: '100px', border: '0.5px dashed rgba(26,25,22,.15)', opacity: 1 - i * 0.3 }}>
                  <span className="font-serif text-[20px] text-ink/11">+</span>
                </div>
              ))}
            </div>
            <p className="font-sans font-light text-[10px] text-ink/28 mt-2.5" style={{ lineHeight: '1.6' }}>
              Your archive is private. It is yours. It is not a social profile — it is a personal registry of what mattered.
            </p>
          </div>

          <div className="h-2" />
        </div>
      </div>

      <div className="px-6 pb-8 flex-shrink-0">
        <BtnPrimary onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Memoir'}
        </BtnPrimary>
        <BtnGhost onClick={() => {
          const url = 'https://ecvproject.com'
          if (navigator.share) navigator.share({ title: 'ECV Memoir', url }).catch(() => {})
          else toast.show('ecvproject.com')
        }}>
          Send this quietly to one person →
        </BtnGhost>
      </div>

      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  )
}
