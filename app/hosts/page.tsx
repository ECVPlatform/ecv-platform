'use client'

import { useRouter } from 'next/navigation'
import { BackLink, BottomNav } from '@/components/ui'

const HOSTS = [
  { ltr: 'H', colorClass: 'g', name: 'Hiroyuki Oka',     role: 'Founder & Host · Fly fishing, western Tokyo',  status: 'act', statusTxt: 'Ch. 001 · Nature · Active',    href: '/chapter/ch001' },
  { ltr: 'S', colorClass: 'b', name: 'Chef Saito Ryo',   role: 'Fermentation, miso, one afternoon',             status: 'rev', statusTxt: 'Ch. 002 · Culinary · In review', href: null },
  { ltr: 'K', colorClass: 'c', name: 'Mori Keiko',       role: 'Documentary filmmaking, one full day',          status: 'rev', statusTxt: 'Ch. 003 · Creative · In review', href: null },
  { ltr: 'Y', colorClass: 'd', name: 'Yamamoto Hiroshi', role: 'Marine biology field day, Sagami Bay',          status: 'rev', statusTxt: 'Ch. 008 · Learning · In review', href: null },
]

const avatarBg: Record<string, string> = {
  g: 'linear-gradient(135deg,#243020,#1a2015)',
  b: 'linear-gradient(135deg,#2a2015,#1a1208)',
  c: 'linear-gradient(135deg,#1a2025,#0d1520)',
  d: 'linear-gradient(135deg,#201520,#150d20)',
}

export default function HostsPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col flex-1 bg-parchment">
      <BackLink href="/home" />
      <div className="px-6 pt-4 pb-2.5 flex-shrink-0">
        <h1 className="font-serif font-normal text-[25px] text-ink" style={{ lineHeight: '1.2' }}>
          People who hold<br />the chapters.
        </h1>
        <p className="font-sans font-light text-[11px] text-tobacco mt-1">Each host holds one experience. Not a listing.</p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
        {/* Registry note */}
        <div className="rounded-xl p-3.5 mb-3.5" style={{ background: 'rgba(26,25,22,.04)' }}>
          <p className="font-sans font-light text-[11px] text-ink/48" style={{ lineHeight: '1.72' }}>
            ECV hosts are invited into the registry — not listed on it. Each one is reviewed before they appear. We build deliberately, not quickly. The registry can grow to many more hosts without ever becoming a feed.
          </p>
          <button
            onClick={() => router.push('/hosts/apply')}
            className="font-sans font-light text-[10px] text-tobacco mt-2 block bg-none border-none cursor-pointer"
          >
            Apply to hold a chapter →
          </button>
        </div>

        {/* Host cards */}
        {HOSTS.map(h => (
          <button
            key={h.name}
            onClick={() => h.href ? router.push(h.href) : undefined}
            className="flex items-center gap-3 w-full text-left px-3.5 py-3 rounded-2xl mb-2 cursor-pointer transition-transform active:scale-99"
            style={{ background: '#fff', border: '0.5px solid rgba(26,25,22,.06)' }}
          >
            <div
              className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-serif italic text-[19px]"
              style={{ background: avatarBg[h.colorClass], color: 'rgba(240,237,232,.46)' }}
            >
              {h.ltr}
            </div>
            <div className="flex-1">
              <div className="font-serif font-normal text-[16px] text-ink">{h.name}</div>
              <div className="font-sans font-light text-[10px] text-tobacco mt-0.5">{h.role}</div>
              <span
                className="font-sans font-light text-[8px] rounded-full px-2 py-0.5 mt-1.5 inline-block"
                style={{
                  letterSpacing: '.08em',
                  border: h.status === 'act' ? '0.5px solid rgba(139,115,85,.3)' : '0.5px solid rgba(26,25,22,.11)',
                  color: h.status === 'act' ? 'var(--tobacco)' : 'var(--fog)',
                }}
              >
                {h.statusTxt}
              </span>
            </div>
            <span className="text-fog text-sm flex-shrink-0">›</span>
          </button>
        ))}
      </div>

      <BottomNav active="hosts" />
    </div>
  )
}
