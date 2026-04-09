'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BackLink, Label, BtnPrimary, BtnGhost, Toast, useToast, TogglePill } from '@/components/ui'

const MONTHS = ['March','April','May','June','July','Aug–Oct','Flexible']
const GUEST_OPTIONS = ['1','2','Family']

export default function RequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id }   = use(params)
  const router   = useRouter()
  const toast    = useToast()

  const [months,    setMonths]    = useState<string[]>([])
  const [guests,    setGuests]    = useState('')
  const [hotel,     setHotel]     = useState('')
  const [dates,     setDates]     = useState('')
  const [intention, setIntention] = useState('')
  const [notes,     setNotes]     = useState('')
  const [loading,   setLoading]   = useState(false)

  const toggleMonth = (m: string) =>
    setMonths(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapter_id: id, months, guests, hotel, dates, intention, notes }),
      })
      if (!res.ok) throw new Error('Request failed')
      // Store intention for memoir screen
      if (typeof window !== 'undefined') sessionStorage.setItem('ecv_intention', intention)
      router.push(`/chapter/${id}/requested`)
    } catch {
      toast.show('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-parchment">
      <BackLink href={`/chapter/${id}`} />

      <div className="px-6 pt-5 pb-0 flex-shrink-0">
        <h1 className="font-serif font-normal text-[26px] text-ink" style={{ lineHeight: '1.2' }}>
          Let's arrange<br />your morning.
        </h1>
        <p className="font-sans font-light text-[11px] text-tobacco mt-2" style={{ lineHeight: '1.87' }}>
          No payment now. No pressure.<br />Tell us a little — we'll be in touch within 24 hours.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-6 pt-4">

          <Label>When are you in Tokyo?</Label>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {MONTHS.map(m => (
              <TogglePill key={m} label={m} active={months.includes(m)} onClick={() => toggleMonth(m)} />
            ))}
          </div>

          <Label>Number of guests</Label>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {GUEST_OPTIONS.map(g => (
              <TogglePill key={g} label={g} active={guests === g} onClick={() => setGuests(guests === g ? '' : g)} />
            ))}
          </div>

          <Label>Your hotel in Tokyo</Label>
          <input
            className="ecv-input"
            placeholder="Optional — helps us arrange pickup"
            value={hotel}
            onChange={e => setHotel(e.target.value)}
          />

          <Label>Preferred dates</Label>
          <input
            className="ecv-input"
            placeholder="e.g. around May 10–15"
            value={dates}
            onChange={e => setDates(e.target.value)}
          />

          {/* Intention box */}
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(26,25,22,.04)', borderLeft: '2px solid rgba(139,115,85,.24)' }}>
            <p className="font-sans font-normal text-[8px] text-tobacco mb-2" style={{ letterSpacing: '.18em', textTransform: 'uppercase' }}>
              Before you go
            </p>
            <p className="font-serif italic text-[16px] text-ink mb-2.5" style={{ lineHeight: '1.5' }}>
              What do you want to take away from this day?
            </p>
            <input
              className="w-full bg-transparent border-none border-b border-ink/15 outline-none font-serif italic text-[15px] text-ink pb-2"
              style={{ borderBottom: '0.5px solid rgba(26,25,22,.15)' }}
              placeholder="One sentence is enough."
              value={intention}
              onChange={e => setIntention(e.target.value)}
            />
            <p className="font-sans font-light text-[9px] text-fog mt-2" style={{ lineHeight: '1.6' }}>
              This becomes the first line of your Memoir — a private record written by you, for you.
            </p>
          </div>

          <Label>Anything else?</Label>
          <textarea
            className="ecv-input"
            rows={3}
            placeholder="First time fishing, a special occasion, no reason at all — all perfectly fine."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />

          <div className="rounded-xl p-3.5 mb-4" style={{ background: 'rgba(139,115,85,.07)' }}>
            <p className="font-serif italic text-sm text-tobacco" style={{ lineHeight: '1.72' }}>
              We don't sell packages or push upgrades. This is a conversation. We'll find what works.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 flex-shrink-0">
        <BtnPrimary onClick={handleSubmit} disabled={loading}>
          {loading ? 'Sending...' : 'Send request'}
        </BtnPrimary>
        <BtnGhost onClick={() => router.back()}>← Back</BtnGhost>
      </div>

      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  )
}
