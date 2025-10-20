import './globals.css'
//import '../style/globals.css'
import { Inter } from 'next/font/google'
//import '../styles/globals.css'


const inter = Inter({ subsets: ['latin'] })

//export const metadata = { ... }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>{children}</body>
    </html>
  )
}
