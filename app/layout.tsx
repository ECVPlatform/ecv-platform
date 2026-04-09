import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ECV — A private registry for meaningful experiences',
  description: 'Some moments stay with you long after they end. ECV is a private registry for the people who create those moments.',
  openGraph: {
    title: 'ECV',
    description: 'A private registry for meaningful experiences.',
    url: 'https://ecvproject.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="ecv-shell">
          {children}
        </div>
      </body>
    </html>
  )
}
