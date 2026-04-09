import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

async function safeQuery(fn: () => Promise<any>) {
  try {
    const res = await fn()
    return {
      data: res.data ?? [],
      count: res.count ?? 0,
      error: null,
    }
  } catch (e) {
    console.error('Dashboard query error:', e)
    return {
      data: [],
      count: 0,
      error: e,
    }
  }
}

async function getDashboardData() {
  const supabase = supabaseAdmin()

  const [requests, memoirs, gifts, hosts] = await Promise.all([
    safeQuery(() =>
      supabase
        .from('requests')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5)
    ),
    safeQuery(() =>
      supabase
        .from('memoirs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5)
    ),
    safeQuery(() =>
      supabase
        .from('gifts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5)
    ),
    safeQuery(() =>
      supabase
        .from('host_applications')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5)
    ),
  ])

  return { requests, memoirs, gifts, hosts }
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string
  value: number
  sub: string
}) {
  return (
    <div
      style={{
        background: '#f7f3ee',
        border: '1px solid rgba(26,25,22,.08)',
        borderRadius: '18px',
        padding: '18px',
      }}
    >
      <div
        style={{
          fontSize: '10px',
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          color: 'rgba(26,25,22,.36)',
          marginBottom: '10px',
          fontFamily: 'sans-serif',
          fontWeight: 300,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '36px',
          lineHeight: 1.1,
          color: '#1A1916',
          fontWeight: 400,
          marginBottom: '6px',
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: '12px',
          lineHeight: 1.7,
          color: 'rgba(26,25,22,.46)',
          fontFamily: 'sans-serif',
          fontWeight: 300,
        }}
      >
        {sub}
      </div>
    </div>
  )
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string
  title: string
  desc?: string
}) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div
        style={{
          fontSize: '9px',
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: 'rgba(26,25,22,.28)',
          marginBottom: '7px',
          fontFamily: 'sans-serif',
          fontWeight: 300,
        }}
      >
        {eyebrow}
      </div>

      <h2
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '28px',
          lineHeight: 1.2,
          fontWeight: 400,
          color: '#1A1916',
          margin: 0,
        }}
      >
        {title}
      </h2>

      {desc && (
        <p
          style={{
            marginTop: '8px',
            marginBottom: 0,
            fontSize: '13px',
            lineHeight: 1.8,
            color: 'rgba(26,25,22,.5)',
            fontFamily: 'sans-serif',
            fontWeight: 300,
            maxWidth: '720px',
          }}
        >
          {desc}
        </p>
      )}
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div
      style={{
        background: 'rgba(255,250,245,.65)',
        border: '1px dashed rgba(26,25,22,.12)',
        borderRadius: '16px',
        padding: '18px',
        color: 'rgba(26,25,22,.42)',
        fontSize: '13px',
        lineHeight: 1.7,
        fontFamily: 'sans-serif',
        fontWeight: 300,
      }}
    >
      {text}
    </div>
  )
}

function DataRow({
  top,
  title,
  meta,
  detail,
}: {
  top: string
  title: string
  meta?: string
  detail?: string
}) {
  return (
    <div
      style={{
        background: '#fffaf5',
        border: '1px solid rgba(26,25,22,.08)',
        borderRadius: '18px',
        padding: '16px 16px 15px',
      }}
    >
      <div
        style={{
          fontSize: '10px',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'rgba(26,25,22,.34)',
          marginBottom: '8px',
          fontFamily: 'sans-serif',
          fontWeight: 300,
        }}
      >
        {top}
      </div>

      <div
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '21px',
          lineHeight: 1.28,
          color: '#1A1916',
          marginBottom: meta ? '6px' : '8px',
          fontWeight: 400,
        }}
      >
        {title}
      </div>

      {meta && (
        <div
          style={{
            fontSize: '12px',
            color: 'rgba(26,25,22,.58)',
            lineHeight: 1.7,
            marginBottom: detail ? '6px' : 0,
            fontFamily: 'sans-serif',
            fontWeight: 300,
          }}
        >
          {meta}
        </div>
      )}

      {detail && (
        <div
          style={{
            fontSize: '12px',
            color: 'rgba(26,25,22,.42)',
            lineHeight: 1.75,
            fontFamily: 'sans-serif',
            fontWeight: 300,
          }}
        >
          {detail}
        </div>
      )}
    </div>
  )
}

export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3efe8',
        color: '#1A1916',
        padding: '28px 20px 60px',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '18px',
            }}
          >
            <Link
              href="/home"
              style={{
                fontSize: '12px',
                color: 'rgba(26,25,22,.42)',
                textDecoration: 'none',
                fontFamily: 'sans-serif',
                fontWeight: 300,
                letterSpacing: '.04em',
              }}
            >
              ← Back to Home
            </Link>

            <div
              style={{
                fontSize: '9px',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'rgba(139,115,85,.62)',
                fontFamily: 'sans-serif',
                fontWeight: 300,
              }}
            >
              Private Registry Intelligence
            </div>
          </div>

          <SectionTitle
            eyebrow="ECV Dashboard"
            title="Experience data, held in context."
            desc="A live view of demand, memory, gifting, and host supply. Less like a control room - more like a quiet reading of what is beginning to matter."
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
            marginBottom: '34px',
          }}
        >
          <StatCard
            label="Requests"
            value={data.requests.count}
            sub="Direct signals of interest entering the system."
          />
          <StatCard
            label="Memoirs"
            value={data.memoirs.count}
            sub="Experiences that became something worth keeping."
          />
          <StatCard
            label="Gifts"
            value={data.gifts.count}
            sub="Moments intentionally passed to someone else."
          />
          <StatCard
            label="Host Applications"
            value={data.hosts.count}
            sub="New supply and potential curation candidates."
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr .85fr',
            gap: '18px',
          }}
        >
          <div>
            <div style={{ marginBottom: '28px' }}>
              <SectionTitle
                eyebrow="Demand"
                title="Latest Requests"
                desc="Where guest intent is showing up first."
              />

              {data.requests.data.length === 0 ? (
                <EmptyState text="まだ request データがありません。" />
              ) : (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {data.requests.data.map((r: any) => (
                    <DataRow
                      key={r.id}
                      top={`${r.chapter_id ?? 'Chapter'} · ${r.status ?? 'new'}`}
                      title={r.user_name ?? 'Guest Request'}
                      meta={`Email: ${r.user_email ?? '—'} · Guests: ${r.guests ?? '—'} · Dates: ${r.dates ?? '—'}`}
                      detail={`Intention: ${r.intention ?? '—'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '28px' }}>
              <SectionTitle
                eyebrow="Memory"
                title="Latest Memoirs"
                desc="What remained after the experience ended."
              />

              {data.memoirs.data.length === 0 ? (
                <EmptyState text="まだ memoir データがありません。" />
              ) : (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {data.memoirs.data.map((m: any) => (
                    <DataRow
                      key={m.id}
                      top={`${m.chapter_id ?? 'Chapter'} · ${m.visibility ?? 'private'}`}
                      title={m.title ?? 'Untitled Memoir'}
                      meta={`With: ${m.with_whom ?? '—'}`}
                      detail={`Before: ${m.before_text ?? '—'} | After: ${m.after_text ?? '—'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div style={{ marginBottom: '28px' }}>
              <SectionTitle
                eyebrow="Gifting"
                title="Latest Gifts"
                desc="How experiences begin to travel beyond the original guest."
              />

              {data.gifts.data.length === 0 ? (
                <EmptyState text="まだ gift データがありません。" />
              ) : (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {data.gifts.data.map((g: any) => (
                    <DataRow
                      key={g.id}
                      top={`${g.chapter_id ?? 'Chapter'} · ${g.gift_code ?? 'gift'}`}
                      title={g.recipient_name ?? 'Gift Recipient'}
                      meta={`Email: ${g.recipient_email ?? '—'}`}
                      detail={`Message: ${g.message ?? '—'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '28px' }}>
              <SectionTitle
                eyebrow="Supply"
                title="Latest Host Applications"
                desc="Potential new hosts entering the registry."
              />

              {data.hosts.data.length === 0 ? (
                <EmptyState text="まだ host application データがありません。" />
              ) : (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {data.hosts.data.map((h: any) => (
                    <DataRow
                      key={h.id}
                      top={`${h.category ?? 'Category'} · ${h.status ?? 'new'}`}
                      title={h.contact_name ?? 'Unknown'}
                      meta={`Email: ${h.contact_email ?? '—'}`}
                      detail={`Description: ${h.description ?? '—'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div
              style={{
                background: '#1A1916',
                color: '#f0ede8',
                borderRadius: '20px',
                padding: '18px',
                border: '1px solid rgba(240,237,232,.08)',
              }}
            >
              <div
                style={{
                  fontSize: '9px',
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,237,232,.28)',
                  marginBottom: '10px',
                  fontFamily: 'sans-serif',
                  fontWeight: 300,
                }}
              >
                Reading the signal
              </div>

              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '20px',
                  lineHeight: 1.45,
                  color: 'rgba(240,237,232,.78)',
                  marginBottom: '10px',
                  fontWeight: 400,
                }}
              >
                ECV becomes real when demand, memory, gifting, and host supply
                begin to move together.
              </div>

              <div
                style={{
                  fontSize: '12px',
                  lineHeight: 1.8,
                  color: 'rgba(240,237,232,.34)',
                  fontFamily: 'sans-serif',
                  fontWeight: 300,
                }}
              >
                This dashboard is the beginning of that view. Next, we can make
                it sharper with chapter-level demand, memoir conversion, and
                gifting signals that reveal which experiences truly resonate.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}