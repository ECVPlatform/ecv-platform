'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BackLink, Label, BtnPrimary, BottomNav, Toast, useToast } from '@/components/ui'

export default function GiftPage() {
  const router  = useRouter()
  const toast   = useToast()

  const [recipientName,  setRecipientName]  = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [message,        setMessage]        = useState('')
  const [loading,        setLoading]        = useState(false)

  const handleSend = async () => {
    if (!recipientName || !recipientEmail) {
      toast.show('Please fill in the recipient\'s name and email.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter_id: 'ch001',
          recipient_name: recipientName,
          recipient_email: recipientEmail,
          message,
        }),
      })
      if (!res.ok) throw new Error()
      toast.show('Gift sent quietly.')
      setTimeout(() => router.push('/home'), 2800)
    } catch {
      toast.show('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-parchment">
      <BackLink href="/home" />

      <div className="px-6 pt-5 pb-3.5 flex-shrink-0">
        <h1 className="font-serif font-normal text-[30px] text-ink" style={{ lineHeight: '1.15' }}>
          <em className="italic text-tobacco">Arigato</em> Once More.
        </h1>
        <p className="font-sans font-light text-[11px] text-ink/46 mt-1.5" style={{ lineHeight: '1.85' }}>
          Return the kindness you received in Japan.<br />Give a day on the river to someone who matters.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Ticket */}
        <div className="mx-6 mb-4 bg-ink rounded-2xl overflow-hidden">
          <div className="relative" style={{ height: '110px' }}>
            <Image
              src="https://static.wixstatic.com/media/8fa6c9_fce2eb41e73e42368ffa98630e45065f~mv2.jpg"
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: 'center 55%', opacity: 0.38 }}
            />
          </div>
          <div className="px-5 pt-4 pb-3.5">
            <p className="font-sans font-light text-[8px] text-parchment/17 mb-1.5" style={{ letterSpacing: '.22em', textTransform: 'uppercase' }}>
              Arigato Once More · ECV × On The Fly
            </p>
            <h3 className="font-serif font-normal text-[20px] text-parchment" style={{ lineHeight: '1.2' }}>
              A wild trout,<br />before Tokyo wakes.
            </h3>
            <p className="font-sans font-light text-[10px] text-parchment/26 mt-1.5">
              Private · Akigawa Valley · Hosted by Hiroyuki Oka
            </p>
          </div>
          <div className="flex mx-5 py-3" style={{ borderTop: '0.5px dashed rgba(240,237,232,.09)' }}>
            {[{ l: 'Duration', v: '~10 hrs' }, { l: 'Guests', v: '1–2' }, { l: 'Valid', v: '12 months' }].map(p => (
              <div key={p.l} className="flex-1">
                <div className="font-sans font-light text-[8px] text-parchment/17" style={{ letterSpacing: '.12em', textTransform: 'uppercase' }}>{p.l}</div>
                <div className="font-serif font-normal text-sm text-parchment/60 mt-0.5">{p.v}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center px-5 py-2.5" style={{ borderTop: '0.5px dashed rgba(240,237,232,.07)' }}>
            <span className="font-sans font-light text-[8px] text-parchment/12" style={{ letterSpacing: '.2em' }}>ECV–OTF–2025</span>
            <span className="font-serif italic text-[10px] text-parchment/18">on the fly</span>
          </div>
        </div>

        {/* Form */}
        <div className="px-6">
          <Label>Recipient name</Label>
          <input
            className="ecv-input"
            placeholder="Name"
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
          />
          <Label>Send to</Label>
          <input
            className="ecv-input"
            type="email"
            placeholder="Email address"
            value={recipientEmail}
            onChange={e => setRecipientEmail(e.target.value)}
          />
          <Label>A short note</Label>
          <textarea
            className="ecv-input"
            style={{ height: '68px', fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontSize: '13px', lineHeight: '1.6' }}
            placeholder="Thank you for everything."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <div className="h-1" />
        </div>
      </div>

      <div className="px-6 pb-8 flex-shrink-0">
        <BtnPrimary onClick={handleSend} disabled={loading}>
          {loading ? 'Sending...' : 'Send gift'}
        </BtnPrimary>
      </div>

      <BottomNav active="gift" />
      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  )
}
