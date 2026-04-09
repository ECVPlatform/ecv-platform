'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BackLink, BtnPrimary, BtnGhost } from '@/components/ui'

export default function RequestedPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router     = useRouter()
  const [intention, setIntention] = useState('')

  useEffect(() => {
    setIntention(sessionStorage.getItem('ecv_intention') || '')
  }, [])

  const shareQuiet = () => {
    const url = `https://ecvproject.com/chapter/${id}`
    if (navigator.share) navigator.share({ title: 'ECV', url }).catch(() => {})
    else navigator.clipboard?.writeText(url)
  }

  return (
    <div className="flex flex-col flex-1 bg-parchment">
      <BackLink href="/home" />
      <div className="flex-1 px-6 flex flex-col justify-center">
        <div className="font-serif italic text-[44px] text-tobacco/32 mb-5 a1">✓</div>
        <h1 className="font-serif font-normal text-[28px] text-ink mb-2.5 a2" style={{ lineHeight: '1.25' }}>
          Request received.<br />We'll be in touch.
        </h1>
        <p className="font-sans font-light text-xs text-ink/44 mb-6 a3" style={{ lineHeight: '1.87' }}>
          Usually within 24 hours. No payment now. Just a conversation.
        </p>

        {intention && (
          <div className="rounded-xl p-4 mb-5 a3" style={{ background: 'rgba(139,115,85,.08)' }}>
            <p className="font-sans font-light text-[8px] text-tobacco mb-1.5" style={{ letterSpacing: '.16em', textTransform: 'uppercase' }}>
              Your intention
            </p>
            <p className="font-serif italic text-[16px] text-ink" style={{ lineHeight: '1.5' }}>
              "{intention}"
            </p>
          </div>
        )}

        <p className="font-sans font-light text-[11px] text-fog text-center mb-5 a4" style={{ lineHeight: '1.7' }}>
          After your experience, return here to complete your Memoir — a private record of what the day meant. Not for anyone else unless you choose.
        </p>

        <div
          onClick={shareQuiet}
          className="flex items-center justify-between pt-4 cursor-pointer a5"
          style={{ borderTop: '0.5px solid rgba(26,25,22,.09)' }}
        >
          <p className="font-sans font-light text-[11px] text-ink/40" style={{ lineHeight: '1.55' }}>
            Know someone who would understand this day?
          </p>
          <span className="text-fog text-sm">›</span>
        </div>
      </div>

      <div className="px-6 pb-8 flex-shrink-0 a5">
        <BtnPrimary onClick={() => router.push('/memoir/new')}>
          Begin your Memoir →
        </BtnPrimary>
        <BtnGhost onClick={() => router.push('/home')}>
          Back to the registry
        </BtnGhost>
      </div>
    </div>
  )
}
