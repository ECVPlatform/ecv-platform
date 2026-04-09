'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Chapter } from '@/types'

// ── BUTTONS ─────────────────────────────────────────────────────────────

export function BtnPrimary({ children, onClick, disabled, type = 'button', className = '' }:
  { children: React.ReactNode; onClick?: () => void; disabled?: boolean; type?: 'button'|'submit'; className?: string }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-ink border-none rounded-xl py-4 font-sans font-light text-xs tracking-widest text-parchment cursor-pointer transition-all active:opacity-75 active:scale-99 disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  )
}

export function BtnGhost({ children, onClick, className = '' }:
  { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full bg-transparent border border-ink/15 rounded-xl py-3 font-sans font-light text-xs tracking-normal text-ink/44 cursor-pointer mt-2 transition-all ${className}`}
      style={{ borderWidth: '0.5px' }}
    >
      {children}
    </button>
  )
}

export function BtnText({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block text-center w-full font-sans font-light text-[10px] tracking-normal text-fog cursor-pointer bg-none border-none mt-3 py-1"
    >
      {children}
    </button>
  )
}

export function BtnDark({ children, onClick, className = '' }:
  { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full bg-parchment border-none rounded-xl py-4 font-sans font-light text-xs tracking-widest text-ink cursor-pointer transition-all ${className}`}
    >
      {children}
    </button>
  )
}

export function BtnOutlineDark({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-transparent rounded-xl py-3 font-sans font-light text-xs tracking-normal text-parchment/34 cursor-pointer mt-2"
      style={{ border: '0.5px solid rgba(240,237,232,.17)' }}
    >
      {children}
    </button>
  )
}

// ── BACK LINK ────────────────────────────────────────────────────────────

export function BackLink({ href, dark = false }: { href: string; dark?: boolean }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(href)}
      className={`flex items-center gap-1.5 font-sans font-light text-[10px] tracking-widest cursor-pointer bg-none border-none px-6 pt-2.5 flex-shrink-0 transition-colors ${
        dark ? 'text-parchment/28 hover:text-parchment/55' : 'text-fog hover:text-tobacco'
      }`}
      style={{ letterSpacing: '.08em' }}
    >
      <span className="text-xs opacity-80">←</span>
      <span>Back to ECV</span>
    </button>
  )
}

// ── STATUS BAR ───────────────────────────────────────────────────────────

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () => {
      const n = new Date()
      const h = n.getHours(), m = n.getMinutes()
      setTime(`${h}:${m < 10 ? '0' + m : m}`)
    }
    fmt()
    const t = setInterval(fmt, 30000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className={`flex justify-between items-center px-6 pt-3.5 flex-shrink-0 ${dark ? '' : ''}`}>
      <span className={`font-sans font-light text-[11px] leading-none ${dark ? 'text-parchment/40' : 'text-ink/35'}`} style={{ letterSpacing: '.02em' }}>
        {time}
      </span>
      <span className={`text-[9px] ${dark ? 'text-parchment/18' : 'text-ink/18'}`} style={{ letterSpacing: '3px' }}>●●●</span>
    </div>
  )
}

// ── PROGRESS DOTS ────────────────────────────────────────────────────────

export function ProgressDots({ current, total = 4 }: { current: number; total?: number }) {
  return (
    <div className="flex justify-center gap-1.5 py-2.5 flex-shrink-0">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-px rounded-sm transition-all duration-400"
          style={{
            height: '1.5px',
            width: i === current ? '28px' : '16px',
            background: i === current ? 'var(--tobacco)' : 'rgba(26,25,22,.1)',
          }}
        />
      ))}
    </div>
  )
}

// ── BOTTOM NAV ───────────────────────────────────────────────────────────

type NavTab = 'discover' | 'hosts' | 'gift' | 'about'

export function BottomNav({ active }: { active: NavTab }) {
  const router = useRouter()
  const tabs: { id: NavTab; label: string; href: string }[] = [
    { id: 'discover', label: 'Discover', href: '/' },
    { id: 'hosts',    label: 'Hosts',    href: '/hosts' },
    { id: 'gift',     label: 'Gift',     href: '/gift' },
    { id: 'about',    label: 'About',    href: '/about' },
  ]
  return (
    <div className="bnav flex justify-around px-4 pb-7 pt-2.5 flex-shrink-0 bg-parchment">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => router.push(tab.href)}
          className="flex flex-col items-center gap-0.5 cursor-pointer p-1 px-3 bg-none border-none"
        >
          <div
            className="rounded-sm transition-all duration-200"
            style={{
              height: '1.5px',
              width: active === tab.id ? '20px' : '15px',
              background: active === tab.id ? 'var(--ink)' : 'var(--fog)',
            }}
          />
          <span
            className="font-sans font-light text-[8px] transition-colors duration-200"
            style={{
              letterSpacing: '.07em',
              color: active === tab.id ? 'var(--ink)' : 'var(--fog)',
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  )
}

// ── HR ───────────────────────────────────────────────────────────────────

export function Hr({ className = '' }: { className?: string }) {
  return <div className={`my-4 ${className}`} style={{ height: '0.5px', background: 'rgba(26,25,22,.08)' }} />
}

// ── LABEL ────────────────────────────────────────────────────────────────

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans font-normal text-[8px] text-fog mb-2" style={{ letterSpacing: '.18em', textTransform: 'uppercase' }}>
      {children}
    </div>
  )
}

// ── TOAST ────────────────────────────────────────────────────────────────

export function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div className="toast" style={{ opacity: visible ? 1 : 0 }}>
      {message}
    </div>
  )
}

export function useToast() {
  const [state, setState] = useState({ msg: '', visible: false })
  const show = (msg: string, duration = 2600) => {
    setState({ msg, visible: true })
    setTimeout(() => setState(s => ({ ...s, visible: false })), duration)
  }
  return { ...state, show }
}

// ── CHAPTER ROW ──────────────────────────────────────────────────────────

export function ChapterRow({ chapter, onClick }: { chapter: Chapter; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 py-3 cursor-pointer transition-opacity active:opacity-70"
      style={{ borderBottom: '0.5px solid rgba(26,25,22,.07)' }}
    >
      <div
        className={`icon-${chapter.icon} w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center font-serif italic text-lg`}
        style={{ color: 'rgba(240,237,232,.44)' }}
      >
        {chapter.ltr}
      </div>
      <div className="flex-1">
        <div className="font-sans font-light text-[8px] text-fog mb-0.5" style={{ letterSpacing: '.13em', textTransform: 'uppercase' }}>
          {chapter.num}
        </div>
        <div className="font-serif font-normal text-[15px] leading-snug text-ink">
          {chapter.title}
        </div>
        <div className="font-sans font-light text-[10px] text-tobacco mt-0.5">
          {chapter.line}
        </div>
        <span
          className={`font-sans font-light text-[8px] rounded-full px-2 py-0.5 mt-1.5 inline-block ${
            chapter.status === 'act'
              ? 'text-tobacco'
              : 'text-fog'
          }`}
          style={{
            border: chapter.status === 'act'
              ? '0.5px solid rgba(139,115,85,.3)'
              : '0.5px solid rgba(26,25,22,.11)',
            letterSpacing: '.08em',
          }}
        >
          {chapter.stTxt}
        </span>
      </div>
      <div className="text-fog text-sm flex-shrink-0">›</div>
    </div>
  )
}

// ── FILTER CHIPS ─────────────────────────────────────────────────────────

export function FilterChips({ options, active, onChange }: {
  options: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex gap-1.5 px-6 pb-3.5 overflow-x-auto no-scrollbar flex-shrink-0">
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className="font-sans font-light text-[10px] rounded-full px-3 py-1 whitespace-nowrap flex-shrink-0 cursor-pointer transition-all"
          style={{
            letterSpacing: '.05em',
            background: active === opt.id ? 'var(--ink)' : 'transparent',
            color:      active === opt.id ? 'var(--parchment)' : 'var(--tobacco)',
            border:     active === opt.id ? '0.5px solid var(--ink)' : '0.5px solid rgba(139,115,85,.26)',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ── TOGGLE OPTION ────────────────────────────────────────────────────────

export function TogglePill({ label, active, onClick }: {
  label: string; active: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-sans font-light text-[11px] text-ink rounded-full px-4 py-2 cursor-pointer transition-all"
      style={{
        border: '0.5px solid rgba(26,25,22,.16)',
        background: active ? 'var(--ink)' : 'transparent',
        color: active ? 'var(--parchment)' : 'var(--ink)',
        borderColor: active ? 'var(--ink)' : 'rgba(26,25,22,.16)',
      }}
    >
      {label}
    </button>
  )
}
