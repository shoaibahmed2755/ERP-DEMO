'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center px-6 justify-between">
      <div className="text-xl font-semibold text-gray-800">
        Dashboard
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-800 transition">🔔</button>
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
