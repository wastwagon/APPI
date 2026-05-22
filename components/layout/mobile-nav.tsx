'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, BookOpen, User } from 'lucide-react'

const mobileNavItems = [
  {
    name: 'Home',
    href: '/home',
    icon: Home,
  },
  {
    name: 'Summit',
    href: '/summit',
    icon: Calendar,
  },
  {
    name: 'Resources',
    href: '/insights',
    icon: BookOpen,
  },
  {
    name: 'Member',
    href: '/contact/login',
    icon: User,
  },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {mobileNavItems.map((item) => {
          const IconComponent = item.icon
          const isActive = pathname === item.href || 
                          (item.href === '/home' && pathname === '/') ||
                          (item.href !== '/home' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-colors duration-200 ${
                isActive 
                  ? 'text-appi-blue' 
                  : 'text-gray-500 hover:text-appi-blue'
              }`}
            >
              <IconComponent 
                className={`h-6 w-6 mb-1 ${
                  isActive ? 'text-appi-blue' : 'text-gray-500'
                }`} 
              />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
