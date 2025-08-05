import './globals.css'
import { WagmiWrapper } from './WagmiWrapper'

export const metadata = {
  title: 'Monad Scratchcard Game',
  description: 'Web3 Scratch Card Game on MONAD NETWORK ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white">
        <WagmiWrapper>
          {children}
        </WagmiWrapper>
      </body>
    </html>
  )
}
