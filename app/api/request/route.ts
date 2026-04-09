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
    const { chapter_id, months, guests, hotel, dates, intention, notes, user_email, user_name } = body

    // Write to Supabase
    const { data, error } = await supabase
      .from('requests')
      .insert({
        chapter_id,
        months:    months  || [],
        guests:    guests  || '',
        hotel:     hotel   || '',
        dates:     dates   || '',
        intention: intention || '',
        notes:     notes   || '',
        user_email: user_email || null,
        user_name:  user_name  || null,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    // Send notification email to Hiro
    await resend.emails.send({
      from: 'ECV Platform <notifications@ecvproject.com>',
      to:   process.env.ECV_NOTIFY_EMAIL || 'hiro@ecvproject.com',
      subject: `New ECV request — ${chapter_id}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; color: #1A1916; padding: 32px;">
          <p style="font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #B8B2A8; margin-bottom: 16px;">ECV Platform · New Request</p>
          <h2 style="font-size: 28px; font-weight: 400; margin: 0 0 8px;">New experience request</h2>
          <p style="font-size: 12px; color: #8B7355; margin-bottom: 24px;">${chapter_id}</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px; font-family: 'DM Sans', sans-serif;">
            ${[
              ['Months',    (months || []).join(', ') || '—'],
              ['Guests',    guests  || '—'],
              ['Hotel',     hotel   || '—'],
              ['Dates',     dates   || '—'],
              ['Intention', intention || '—'],
              ['Notes',     notes   || '—'],
              ['Email',     user_email || '—'],
            ].map(([k, v]) => `
              <tr style="border-bottom: 0.5px solid rgba(26,25,22,.08);">
                <td style="padding: 8px 0; color: #B8B2A8; width: 100px; font-weight: 300;">${k}</td>
                <td style="padding: 8px 0; color: #1A1916; font-weight: 300;">${v}</td>
              </tr>`).join('')}
          </table>
          <p style="font-size: 11px; color: #B8B2A8; margin-top: 24px; font-family: 'DM Sans', sans-serif;">
            Request ID: ${data?.id || 'pending'}
          </p>
        </div>
      `,
    }).catch(e => console.error('Resend error:', e)) // Non-fatal

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Request error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
