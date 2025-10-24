import './globals.css'

export const metadata = {
  title: 'SachinVPN - Free WireGuard VPN',
  description: 'Generate your free WireGuard VPN configuration instantly',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}