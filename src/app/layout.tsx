import './globals.css'

export const metadata = {
  title: 'Retirement Calculator',
  description: 'Calculate your retirement savings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}