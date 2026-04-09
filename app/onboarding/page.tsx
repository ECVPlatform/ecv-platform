'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  StatusBar, ProgressDots,
  BtnPrimary, BtnGhost, BtnText, BtnDark, BtnOutlineDark, BtnText as Btn
} from '@/components/ui'

type Step = 1 | 2 | 3 | 4

const MOMENTS = [
  'Being in nature', 'Making something', 'Sharing a meal', 'Learning slowly',
  'Moving through a place', 'Time with family', 'Quiet & stillness', "Something I can't name",
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep]   = useState<Step>(1)
  const [moment, setMoment] = useState('')
  const [turn, setTurn]   = useState('')

  const go = (s: Step) => setStep(s)

const enterPlatform = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('ecv_moment', moment)
    sessionStorage.setItem('ecv_turn', turn)
    sessionStorage.setItem('ecv_onboarded', 'true')
  }
  router.push('/home')
}

  return (
    <>
      {/* Step 1 — Opening */}
      {step === 1 && (
        <div className="flex flex-col flex-1 bg-parchment">
          <StatusBar />
          <ProgressDots current={0} />
          <div className="flex-1 flex flex-col justify-between px-6 py-7">
            <div className="font-sans font-light text-[10px] text-ink/20 a1" style={{ letterSpacing: '.3em', textTransform: 'uppercase' }}>
              ECV
            </div>
            <div>
              <h1 className="font-serif font-light text-[50px] leading-tight text-ink a2" style={{ letterSpacing: '-.02em' }}>
                Some moments<br />stay with you<br />
                <em className="italic text-tobacco">long after<br />they end.</em>
              </h1>
              <div className="w-6 my-5 a3" style={{ height: '1px', background: 'rgba(26,25,22,.16)' }} />
              <p className="font-sans font-light text-xs text-ink/38 max-w-[270px] a3" style={{ lineHeight: '1.88' }}>
                ECV is a private registry for meaningful experiences — and the people who hold them.
              </p>
              <p className="font-sans font-light text-[10px] text-ink/28 mt-2.5 a3" style={{ lineHeight: '1.65' }}>
                No likes. No algorithm. No audience required.
              </p>
            </div>
            <div className="a4">
              <div className="flex gap-2.5 mb-3">
                <button
                  onClick={() => go(2)}
                  className="flex-1 py-4 rounded-xl font-sans font-light text-[11px] bg-ink text-parchment border-none cursor-pointer transition-all active:scale-97"
                  style={{ letterSpacing: '.07em' }}
                >
                  I'm looking
                </button>
                <button
                  onClick={() => router.push('/hosts/apply')}
                  className="flex-1 py-4 rounded-xl font-sans font-light text-[11px] bg-transparent text-ink/52 cursor-pointer transition-all active:scale-97"
                  style={{ letterSpacing: '.07em', border: '0.5px solid rgba(26,25,22,.15)' }}
                >
                  I have something
                </button>
              </div>
              <p className="font-sans font-light text-[10px] text-fog text-center" style={{ letterSpacing: '.04em' }}>
                You can be both. Most people are.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 — Moment */}
      {step === 2 && (
        <div className="flex flex-col flex-1 bg-parchment">
          <StatusBar />
          <ProgressDots current={1} />
          <div className="flex-1 flex flex-col px-6 py-6">
            <div className="flex-1 min-h-3.5" />
            <h2 className="font-serif font-normal text-4xl text-ink a1" style={{ lineHeight: '1.15' }}>
              Think of a moment<br />you didn't want<br />to <em className="italic text-tobacco">end.</em>
            </h2>
            <p className="font-sans font-light text-xs text-ink/42 mt-2.5 a2" style={{ lineHeight: '1.88' }}>
              Not a destination. Not an achievement.<br />A specific feeling that stayed longer than it should.
            </p>
            <div className="flex flex-wrap gap-2 mt-5 a3">
              {MOMENTS.map(m => (
                <button
                  key={m}
                  onClick={() => setMoment(m)}
                  className="font-sans font-light text-[11px] text-ink rounded-full px-4 py-2 cursor-pointer transition-all"
                  style={{
                    border: '0.5px solid rgba(26,25,22,.16)',
                    background: moment === m ? 'var(--ink)' : 'transparent',
                    color: moment === m ? 'var(--parchment)' : 'var(--ink)',
                    borderColor: moment === m ? 'var(--ink)' : 'rgba(26,25,22,.16)',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="h-4" />
          </div>
          <div className="px-6 pb-8 flex-shrink-0">
            <BtnPrimary onClick={() => go(3)}>That's the one</BtnPrimary>
            <BtnText onClick={() => go(3)}>take a moment</BtnText>
          </div>
        </div>
      )}

      {/* Step 3 — Turn */}
      {step === 3 && (
        <div className="flex flex-col flex-1 bg-parchment">
          <StatusBar />
          <ProgressDots current={2} />
          <div className="flex-1 flex flex-col px-6 py-6">
            <div className="flex-1 min-h-3.5" />
            <h2 className="font-serif font-normal text-4xl text-ink a1" style={{ lineHeight: '1.15' }}>
              Does anyone<br /><em className="italic text-tobacco">give</em> you that?
            </h2>
            <p className="font-sans font-light text-xs text-ink/42 mt-2.5 a2" style={{ lineHeight: '1.88' }}>
              A person. A place. Someone who knows exactly where to take you.<br /><br />
              Or perhaps — you are that person for someone else.
            </p>
            <div className="flex flex-col gap-2.5 mt-5 a3">
              {[
                { id: 'seeking',   title: "I'm looking for it",   sub: "Show me experiences I can't find anywhere else" },
                { id: 'offering',  title: 'I can offer it',        sub: 'I have something genuine worth sharing' },
                { id: 'both',      title: 'Both, in time',         sub: 'I want to understand before I decide' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setTurn(opt.id)}
                  className="text-left rounded-2xl px-4 py-4 cursor-pointer transition-all"
                  style={{
                    border: '0.5px solid rgba(26,25,22,.15)',
                    background: turn === opt.id ? 'var(--ink)' : 'transparent',
                  }}
                >
                  <span className={`font-serif font-normal text-[17px] block mb-1 ${turn === opt.id ? 'text-parchment' : 'text-ink'}`}>
                    {opt.title}
                  </span>
                  <span className={`font-sans font-light text-[11px] block ${turn === opt.id ? 'text-parchment/40' : 'text-ink/40'}`} style={{ lineHeight: '1.55' }}>
                    {opt.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="px-6 pb-8 flex-shrink-0">
            <BtnPrimary onClick={() => go(4)}>Continue</BtnPrimary>
          </div>
        </div>
      )}

      {/* Step 4 — Manifesto (tobacco) */}
      {step === 4 && (
        <div className="flex flex-col flex-1" style={{ background: '#8B7355' }}>
          <StatusBar dark />
          <ProgressDots current={3} />
          <button
            onClick={() => router.push('/home')}
            className="flex items-center gap-1.5 font-sans font-light text-[10px] px-6 pt-2 bg-none border-none cursor-pointer a1"
            style={{ letterSpacing: '.08em', color: 'rgba(240,237,232,.5)' }}
          >
            <span className="text-xs opacity-80">←</span>
            Back to ECV
          </button>

          <div className="flex-1 px-6 overflow-y-auto no-scrollbar" style={{ paddingTop: '14px' }}>
            <p className="font-sans font-light text-[9px] a1" style={{ letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(240,237,232,.45)' }}>
              Experience Creates Value
            </p>
            <h2 className="font-serif font-normal text-3xl mt-3.5 a2" style={{ lineHeight: '1.22', color: '#F0EDE8' }}>
              Not a marketplace.<br />Not a <em className="italic" style={{ color: 'rgba(240,237,232,.6)' }}>social</em> network.<br />Something that didn't exist before.
            </h2>
            <div className="w-6 my-4 a3" style={{ height: '1px', background: 'rgba(240,237,232,.2)' }} />

            <div className="a3">
              {[
                { n: '01', t: 'A private registry', d: 'Curated hosts. Invited, not listed. Each one reviewed before they appear.' },
                { n: '02', t: 'Request, don\'t book', d: 'A conversation begins. We arrange. You arrive.' },
                { n: '03', t: 'One party. Always.', d: 'Private by design. No crowds. No noise.' },
                { n: '04', t: 'A Memoir stays with you', d: 'Every experience becomes a Memoir — a permanent personal record. Yours to keep, share quietly, or give.' },
              ].map(row => (
                <div key={row.n} className="flex gap-3.5 py-3" style={{ borderBottom: '0.5px solid rgba(240,237,232,.15)' }}>
                  <div className="font-serif font-light text-[11px] w-4 flex-shrink-0 pt-0.5" style={{ color: 'rgba(240,237,232,.25)' }}>{row.n}</div>
                  <div>
                    <div className="font-serif font-normal text-[16px]" style={{ color: 'rgba(240,237,232,.90)' }}>{row.t}</div>
                    <div className="font-sans font-light text-[11px] mt-0.5" style={{ lineHeight: '1.7', color: 'rgba(240,237,232,.55)' }}>{row.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="a4 mt-4 p-4 rounded-xl" style={{ border: '0.5px solid rgba(240,237,232,.18)', background: 'rgba(240,237,232,.06)' }}>
              <p className="font-sans font-light text-[8px] mb-2" style={{ letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(240,237,232,.40)' }}>
                This is not social media
              </p>
              {['No likes. No followers. No feed.', 'Not everything meaningful needs an audience.', 'What you choose to keep is as valuable as what you share.', 'How much you reveal becomes part of who you are.'].map(line => (
                <p key={line} className="font-sans font-light text-[11px] py-0.5" style={{ lineHeight: '1.7', color: 'rgba(240,237,232,.52)' }}>{line}</p>
              ))}
            </div>

            <div className="a5 mt-3.5 mb-2 rounded-xl overflow-hidden" style={{ background: 'rgba(240,237,232,.08)', border: '0.5px solid rgba(240,237,232,.16)' }}>
              <div className="px-4 py-4">
                <p className="font-sans font-light text-[8px] mb-2" style={{ letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,.38)' }}>
                  A Memoir — after the experience
                </p>
                <p className="font-serif font-normal text-[18px]" style={{ lineHeight: '1.35', color: 'rgba(240,237,232,.80)' }}>
                  "The morning the city felt very far away."
                </p>
                <p className="font-sans font-light text-[11px] mt-2" style={{ lineHeight: '1.65', color: 'rgba(240,237,232,.52)' }}>
                  Before: to feel the river before Tokyo woke up.<br />After: more silence than I expected. Still thinking about it.
                </p>
                <div className="flex justify-between items-center mt-3 pt-2.5" style={{ borderTop: '0.5px solid rgba(240,237,232,.13)' }}>
                  <span className="font-sans font-light text-[9px]" style={{ color: 'rgba(240,237,232,.38)' }}>Akigawa Valley · Hiroyuki Oka · Oct 2025</span>
                  <span className="font-sans font-light text-[8px] px-2 py-0.5 rounded-full" style={{ letterSpacing: '.12em', textTransform: 'uppercase', border: '0.5px solid rgba(240,237,232,.18)', color: 'rgba(240,237,232,.38)' }}>
                    Private
                  </span>
                </div>
              </div>
            </div>
            <div className="h-6" />
          </div>

          <div className="px-6 pb-8 flex-shrink-0 a6">
            <BtnDark onClick={enterPlatform}>Enter ECV</BtnDark>
            <BtnOutlineDark onClick={() => router.push('/hosts/apply')}>I have something to offer</BtnOutlineDark>
          </div>
        </div>
      )}
    </>
  )
}