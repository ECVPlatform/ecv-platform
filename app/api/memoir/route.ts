import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { chapter_id, title, before_text, after_text, with_whom, visibility, photo_url } = body

    const { data, error } = await supabase
      .from('memoirs')
      .insert({
        chapter_id,
        title:       title       || '',
        before_text: before_text || '',
        after_text:  after_text  || '',
        with_whom:   with_whom   || '',
        visibility:  visibility  || 'private',
        photo_url:   photo_url   || null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Memoir error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id')
    if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 })

    const { data, error } = await supabase
      .from('memoirs')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ memoirs: data })
  } catch (err) {
    console.error('Memoir fetch error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
