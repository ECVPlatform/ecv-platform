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
    const { chapter_id, recipient_name, recipient_email, message } = body

    // Write to DB
    const { data, error } = await supabase
      .from('gifts')
      .insert({ chapter_id, recipient_name, recipient_email, message: message || '' })
      .select()
      .single()

    if (error) throw error

    const giftCode = data?.gift_code || 'ECV–OTF'

    // Send gift email to recipient
    await resend.emails.send({
      from: 'ECV <gifts@ecvproject.com>',
      to:   recipient_email,
      subject: `A gift for you — a day on the river in Tokyo`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; color: #1A1916; padding: 40px; background: #1A1916; border-radius: 20px;">
          <p style="font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: rgba(240,237,232,.2); margin-bottom: 16px; font-family: 'DM Sans', sans-serif;">Arigato Once More · ECV × On The Fly</p>
          <h1 style="font-size: 28px; font-weight: 400; color: rgba(240,237,232,.85); margin: 0 0 8px; line-height: 1.25;">
            A wild trout,<br />before Tokyo wakes.
          </h1>
          <p style="font-size: 12px; color: rgba(240,237,232,.35); margin-bottom: 28px; font-family: 'DM Sans', sans-serif; font-weight: 300;">
            Private · Akigawa Valley · Hosted by Hiroyuki Oka
          </p>
          ${message ? `
          <div style="border-left: 1px solid rgba(240,237,232,.1); padding-left: 16px; margin-bottom: 28px;">
            <p style="font-size: 16px; font-style: italic; color: rgba(240,237,232,.55); line-height: 1.7; margin: 0;">"${message}"</p>
          </div>` : ''}
          <p style="font-size: 12px; color: rgba(240,237,232,.35); font-family: 'DM Sans', sans-serif; font-weight: 300; margin-bottom: 24px; line-height: 1.8;">
            Dear ${recipient_name},<br /><br />
            Someone arranged a private fly fishing day in western Tokyo for you. A morning on mountain rivers where wild trout still rise — just beyond the city's skyline.<br /><br />
            No prior experience needed. Your host handles everything.
          </p>
          <div style="border-top: 0.5px dashed rgba(240,237,232,.1); padding-top: 20px;">
            <p style="font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: rgba(240,237,232,.18); margin-bottom: 6px; font-family: 'DM Sans', sans-serif;">Your gift code</p>
            <p style="font-size: 20px; letter-spacing: .3em; color: rgba(240,237,232,.4); font-family: 'DM Sans', sans-serif; font-weight: 300;">${giftCode}</p>
          </div>
          <div style="margin-top: 24px; padding-top: 20px; border-top: 0.5px solid rgba(240,237,232,.07);">
            <a href="https://ecvproject.com/chapter/ch001" style="display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; letter-spacing: .08em; color: rgba(240,237,232,.45); text-decoration: none;">
              ecvproject.com →
            </a>
          </div>
        </div>
      `,
    }).catch(e => console.error('Resend gift error:', e))

    // Notify Hiro
    await resend.emails.send({
      from: 'ECV Platform <notifications@ecvproject.com>',
      to:   process.env.ECV_NOTIFY_EMAIL || 'hiro@ecvproject.com',
      subject: `Gift sent — ${recipient_name} <${recipient_email}>`,
      html: `<p style="font-family: Georgia; font-size: 14px; color: #1A1916;">Gift code <strong>${giftCode}</strong> sent to ${recipient_name} (${recipient_email}).</p>`,
    }).catch(e => console.error('Notify error:', e))

    return NextResponse.json({ success: true, gift_code: giftCode })
  } catch (err) {
    console.error('Gift error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
