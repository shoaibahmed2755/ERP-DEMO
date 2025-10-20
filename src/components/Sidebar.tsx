'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'Inventory', href: '/dashboard/inventory', icon: '📦' },
  { name: 'Employees', href: '/dashboard/employees', icon: '👥' },
  { name: 'AI Chat', href: '/dashboard/ai-chat', icon: '🤖' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="h-16 flex items-center px-6 text-2xl font-bold border-b border-gray-700">
        ERP Demo
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <div key={item.href} className="flex flex-col px-3 py-2 rounded-md">
              <Link
                href={item.href}
                className={`flex items-center text-sm font-medium
                  transition-colors duration-200
                  ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                `}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>

              {(item.name === 'Inventory' || item.name === 'Employees') && (
                <Link
                  href={`${item.href}/new`}
                  className="ml-7 mt-1 text-xs text-blue-400 hover:text-blue-600"
                >
                  + Add
                </Link>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
