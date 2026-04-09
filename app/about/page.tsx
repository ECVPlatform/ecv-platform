'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BackLink, Hr, Label, BtnPrimary, BtnGhost, BottomNav, Toast, useToast } from '@/components/ui'

const PRINCIPLES = [
  { n: '1', t: 'The Registry',     d: 'A growing collection of meaningful experiences — each privately arranged, each reviewed before it appears. Built to hold many without ever becoming a feed.' },
  { n: '2', t: 'The Memoir',       d: "ECV's native object. A permanent personal record — before and after. Private, shareable, or giftable. Never public unless you choose." },
  { n: '3', t: 'Arigato Once More', d: 'Return the kindness you received in Japan. Gifted as a day on the river.' },
]

const HOW_IT_WORKS = [
  'Experiences are privately priced. No listing fees visible to guests.',
  'Hosts set their own terms. ECV arranges. No transaction without conversation.',
  'Arigato gifts are fixed-price, processed through ECV directly.',
  'Memoirs are always free. Membership supports how they are organized, extended, and kept.',
]

const TIERS = [
  {
    name: 'Free', price: 'Always', priceNote: '—', highlight: 'Begin your first meaningful experience.',
    items: ['Create your first meaningful experience','Save Memoirs and personal reflections','Explore featured chapters and hosts','Experience the philosophy of ECV'],
    cta: 'Begin for free', sig: false,
  },
  {
    name: 'Member', price: '$15', priceNote: '/ month', highlight: 'Build your personal archive.',
    items: ['Full private experience registry','Organize Memoirs, reflections, and saved moments','Private collections across family, travel, gratitude, and more','More chapter inspiration and curated guidance','Early access to selected experiences and updates'],
    cta: 'Become a Member', sig: false,
  },
  {
    name: 'Signature', price: '$40', priceNote: '/ month', highlight: 'A more personal way to experience ECV.',
    items: ['ECV Concierge — personal guidance from the team','Recommendations shaped by your values and interests','Priority access to selected hosts and limited experiences','Premium gifting and recognition elements','Thoughtful support in shaping more meaningful experiences','Access to Signature-only invitations and offerings'],
    cta: 'Join Signature', sig: true,
  },
]

export default function AboutPage() {
  const router = useRouter()
  const toast  = useToast()

  return (
    <div className="flex flex-col flex-1 bg-parchment">
      <BackLink href="/home" />

      <div className="px-6 pt-8 pb-0 flex-shrink-0">
        <p className="font-sans font-light text-[9px] text-fog mb-3 a1" style={{ letterSpacing: '.2em', textTransform: 'uppercase' }}>ECV Project</p>
        <h1 className="font-serif font-normal text-[32px] text-ink a2" style={{ lineHeight: '1.15' }}>
          Experience<br /><em className="italic text-tobacco">Creates Value.</em>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-6 pt-5">
          <p className="font-sans font-light text-xs text-ink/58 a3" style={{ lineHeight: '1.92' }}>
            Some of the most meaningful moments in life are not things we own. They are experiences we live. ECV is built on the belief that these moments can be arranged, remembered, and — when the time is right — shared.
          </p>

          <div className="border-l-2 pl-4 my-5 a4" style={{ borderColor: 'rgba(139,115,85,.24)' }}>
            <p className="font-serif italic text-[19px] text-ink" style={{ lineHeight: '1.45' }}>
              "The most powerful stories are not simply told. They are lived."
            </p>
            <p className="font-sans font-light text-[9px] text-fog mt-1.5" style={{ letterSpacing: '.05em' }}>— ECV</p>
          </div>

          {/* Anti block */}
          <div className="rounded-xl p-3.5 mb-4" style={{ background: 'rgba(26,25,22,.04)' }}>
            <p className="font-serif font-normal text-sm text-ink mb-2.5">What ECV is not.</p>
            {['Not a social network. Not a feed. Not a platform for performance or public validation.','No likes. No follower counts. No algorithm deciding what matters to you.','What you choose to keep is as valuable as what you share. How much you reveal becomes part of who you are.','ECV is a registry. What you do with it is entirely yours.'].map(line => (
              <p key={line} className="font-sans font-light text-[11px] text-ink/50 py-1" style={{ lineHeight: '1.65', borderBottom: '0.5px solid rgba(26,25,22,.06)' }}>{line}</p>
            ))}
          </div>

          <Hr />
          <Label>What we are building</Label>
          {PRINCIPLES.map(p => (
            <div key={p.n} className="flex gap-3.5 items-start py-3.5" style={{ borderBottom: '0.5px solid rgba(26,25,22,.07)' }}>
              <div className="font-serif text-[28px] text-tobacco/20 w-7 flex-shrink-0" style={{ lineHeight: '1' }}>{p.n}</div>
              <div>
                <div className="font-serif font-normal text-[15px] text-ink">{p.t}</div>
                <div className="font-sans font-light text-[11px] text-ink/48 mt-0.5" style={{ lineHeight: '1.7' }}>{p.d}</div>
              </div>
            </div>
          ))}

          {/* How ECV works */}
          <div className="rounded-xl p-3.5 mt-4 mb-4" style={{ border: '0.5px solid rgba(26,25,22,.08)' }}>
            <p className="font-serif font-normal text-sm text-ink mb-2.5">How ECV works.</p>
            {HOW_IT_WORKS.map(line => (
              <div key={line} className="flex gap-3 py-1.5" style={{ borderBottom: '0.5px solid rgba(26,25,22,.06)' }}>
                <span className="font-serif text-sm text-tobacco/28">—</span>
                <span className="font-sans font-light text-[11px] text-ink/50" style={{ lineHeight: '1.65' }}>{line}</span>
              </div>
            ))}
          </div>

          <Hr />
          <Label>The founder</Label>
          <div className="flex items-center gap-3 mb-3.5">
            <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
              <Image src="https://static.wixstatic.com/media/8fa6c9_6da49ef2b8c148d4917d096679ff1534~mv2.jpg" alt="Hiroyuki Oka" fill className="object-cover" />
            </div>
            <div>
              <div className="font-serif font-normal text-[16px] text-ink">Hiroyuki Oka</div>
              <div className="font-sans font-light text-[9px] text-tobacco mt-0.5" style={{ lineHeight: '1.55' }}>
                Founder · ECV Project & On The Fly<br />CNN, J.P. Morgan · Tokyo · Born 1983
              </div>
            </div>
          </div>
          <p className="font-sans font-light text-xs text-ink/58" style={{ lineHeight: '1.92' }}>
            Born in Tokyo. Shaped by years in Taiwan, London, and the United States. A career spanning J.P. Morgan and CNN. On The Fly began with a simple realization: even in one of the world's greatest cities, there are places that remain quietly undiscovered.
          </p>

          <Hr />

          {/* Membership */}
          <div className="mt-1 mb-1">
            <p className="font-sans font-light text-[9px] text-fog mb-2.5" style={{ letterSpacing: '.2em', textTransform: 'uppercase' }}>
              Membership for meaningful experiences
            </p>
            <p className="font-serif italic text-[18px] text-ink mb-1.5" style={{ lineHeight: '1.4' }}>
              ECV membership supports how experiences are discovered, kept, and returned to.
            </p>
            <p className="font-sans font-light text-[11px] text-ink/42 mb-4" style={{ lineHeight: '1.75' }}>
              Not payment for experiences themselves. Experiences are privately arranged through conversation and separately priced.
            </p>

            {TIERS.map(tier => (
              <div key={tier.name} className="py-4" style={{ borderTop: '0.5px solid rgba(26,25,22,.09)' }}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className={`font-serif font-normal text-[17px] ${tier.sig ? 'text-tobacco' : 'text-ink'}`}>
                    {tier.name}
                  </span>
                  <span className="font-sans font-light text-xs text-tobacco">
                    {tier.price}<span className="text-fog ml-0.5">&nbsp;{tier.priceNote}</span>
                  </span>
                </div>
                <p className="font-sans font-light text-[11px] text-ink/55 mb-2.5">{tier.highlight}</p>
                <ul className="list-none mb-3">
                  {tier.items.map(item => (
                    <li key={item} className="font-sans font-light text-[11px] text-ink/48 py-0.5 pl-3 relative" style={{ lineHeight: '1.62' }}>
                      <span className="absolute left-0.5 text-fog">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => toast.show(tier.sig ? 'Signature details coming soon.' : tier.name === 'Free' ? 'Welcome. Begin for free.' : 'Membership details coming soon.')}
                  className={`font-sans font-light text-[11px] bg-none border-none pb-0.5 cursor-pointer transition-colors ${tier.sig ? 'text-tobacco' : 'text-ink'}`}
                  style={{
                    letterSpacing: '.07em',
                    borderBottom: tier.sig ? '0.5px solid rgba(139,115,85,.3)' : '0.5px solid rgba(26,25,22,.25)',
                  }}
                >
                  {tier.cta}
                </button>
              </div>
            ))}

            <p className="font-sans font-light text-[10px] text-ink/32 mt-4 pt-3.5" style={{ lineHeight: '1.65', borderTop: '0.5px solid rgba(26,25,22,.07)' }}>
              <strong className="font-normal text-ink/52">Memoirs are always free.</strong> Membership supports access, organization, and your ongoing relationship with ECV — not the experiences themselves.
            </p>
          </div>

          <div className="h-1.5" />
        </div>
      </div>

      <div className="px-6 pb-3 flex-shrink-0">
        <BtnPrimary onClick={() => router.push('/registry')}>Browse the registry</BtnPrimary>
        <BtnGhost onClick={() => {
          if (navigator.share) navigator.share({ title: 'ECV', url: 'https://ecvproject.com' }).catch(() => {})
          else toast.show('ecvproject.com')
        }}>
          Send ECV to one person →
        </BtnGhost>
      </div>

      <BottomNav active="about" />
      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  )
}
