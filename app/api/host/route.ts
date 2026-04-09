import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { category, description, contact } = body

    // Parse name/email from contact string
    const emailMatch = contact?.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)
    const contact_email = emailMatch?.[0] || null
    const contact_name  = contact?.replace(contact_email || '', '').trim() || contact || ''

    const { data, error } = await supabase
      .from('host_applications')
      .insert({ category, description, contact_name, contact_email, status: 'received' })
      .select()
      .single()

    if (error) throw error

    // Notify Hiro
    await resend.emails.send({
      from: 'ECV Platform <notifications@ecvproject.com>',
      to:   process.env.ECV_NOTIFY_EMAIL || 'hiro@ecvproject.com',
      subject: `New host application — ${category || 'Unspecified'}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; color: #1A1916; padding: 32px;">
          <p style="font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #B8B2A8; margin-bottom: 16px; font-family: 'DM Sans', sans-serif;">ECV Platform · Host Application</p>
          <h2 style="font-size: 24px; font-weight: 400; margin: 0 0 20px;">New host expression of interest</h2>
          <table style="width: 100%; font-size: 12px; font-family: 'DM Sans', sans-serif; border-collapse: collapse;">
            ${[
              ['Category',    category    || '—'],
              ['Description', description || '—'],
              ['Contact',     contact     || '—'],
            ].map(([k, v]) => `
              <tr style="border-bottom: 0.5px solid rgba(26,25,22,.08);">
                <td style="padding: 8px 0; color: #B8B2A8; width: 100px; font-weight: 300;">${k}</td>
                <td style="padding: 8px 0; color: #1A1916; font-weight: 300;">${v}</td>
              </tr>`).join('')}
          </table>
          <p style="font-size: 11px; color: #B8B2A8; margin-top: 20px; font-family: 'DM Sans', sans-serif;">ID: ${data?.id}</p>
        </div>
      `,
    }).catch(e => console.error('Notify error:', e))

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Host application error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
