'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const onboarded = sessionStorage.getItem('ecv_onboarded')

    if (onboarded === 'true') {
      router.push('/home')
    } else {
      router.push('/onboarding')
    }
  }, [router])

  return null
}