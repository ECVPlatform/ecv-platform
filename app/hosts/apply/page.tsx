'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BackLink, Label, BtnPrimary, BtnGhost, Toast, useToast, TogglePill } from '@/components/ui'

const CATEGORIES = ['Nature','Culinary','Creative','Science','Family','Cultural','Reconnect','Other']

const NOT_THIS = [
  'Tour guides or commercial vendors',
  'Required to be famous or credentialed',
  'Expected to promise transformation',
  'Simply: people with something genuine worth sharing',
]

export default function HostApplyPage() {
  const router   = useRouter()
  const toast    = useToast()

  const [category,    setCategory]    = useState('')
  const [description, setDescription] = useState('')
  const [contact,     setContact]     = useState('')
  const [loading,     setLoading]     = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/host', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, description, contact }),
      })
      if (!res.ok) throw new Error()
      toast.show('Expression of interest received.')
      setTimeout(() => router.push('/home'), 2800)
    } catch {
      toast.show('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-parchment">
      <BackLink href="/hosts" />
      <div className="px-6 pt-5 pb-0 flex-shrink-0">
        <h1 className="font-serif font-normal text-[26px] text-ink" style={{ lineHeight: '1.2' }}>
          You have something<br />rare to offer.
        </h1>
        <p className="font-sans font-light text-[11px] text-tobacco mt-2" style={{ lineHeight: '1.87' }}>
          Tell us what it is. We'll take it from there.<br />No pitch deck. No application form.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-6 pt-4">
          <Label>What kind of experience?</Label>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {CATEGORIES.map(c => (
              <TogglePill
                key={c}
                label={c}
                active={category === c}
                onClick={() => setCategory(category === c ? '' : c)}
              />
            ))}
          </div>

          <Label>Describe it simply</Label>
          <textarea
            className="ecv-input"
            rows={3}
            placeholder="e.g. I take guests onto mountain rivers in western Tokyo to fly fish for wild trout."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <Label>Your name & contact</Label>
          <input
            className="ecv-input"
            placeholder="Name and email"
            value={contact}
            onChange={e => setContact(e.target.value)}
          />

          {/* What hosts are NOT */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: 'rgba(26,25,22,.04)' }}>
            <p className="font-serif font-normal text-[15px] text-ink mb-2.5">What ECV hosts are not.</p>
            {NOT_THIS.map(line => (
              <div key={line} className="flex gap-3 py-1.5" style={{ borderBottom: '0.5px solid rgba(26,25,22,.07)' }}>
                <span className="font-serif text-sm text-tobacco/28">—</span>
                <span className="font-sans font-light text-[11px] text-ink/54" style={{ lineHeight: '1.65' }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 flex-shrink-0">
        <BtnPrimary onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </BtnPrimary>
        <BtnGhost onClick={() => router.push('/home')}>Back to ECV</BtnGhost>
      </div>

      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  )
}
