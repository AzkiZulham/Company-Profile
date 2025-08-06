'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { FiSearch, FiUser, FiPlus } from 'react-icons/fi'
import { usePathname, useRouter } from 'next/navigation'
import Backendless from '@/lib/backendless'

interface BackendlessUser {
  objectId: string
  email: string
  [key: string]: unknown
}

interface NavLink {
  label: string
  href: string
}

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<BackendlessUser | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await Backendless.UserService.getCurrentUser() as BackendlessUser
        if (user?.objectId) {
          setCurrentUser(user)
        } else {
          await Backendless.UserService.logout()
          setCurrentUser(null)
        }
      } catch {
        setCurrentUser(null)
      }
    }

    fetchUser()
    const handleUserEvent = () => fetchUser()
    window.addEventListener('userLoggedIn', handleUserEvent)
    return () => window.removeEventListener('userLoggedIn', handleUserEvent)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await Backendless.UserService.logout()
    localStorage.clear()
    setCurrentUser(null)
    window.location.href = '/'
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsOpen(false)
    }
  }

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href))

  const baseLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Product', href: '/products' },
    { label: 'Teams', href: '/teams' },
    { label: 'Blog List', href: '/blogs' },
  ]

  return (
    <nav className="bg-white text-gray-600 sticky top-0 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/image/logo-rev.png" 
            alt="Logo" 
            width={200} 
            height={200} 
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 font-semibold">
          {baseLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`relative transition-all duration-300 ${
                isActive(href)
                  ? 'text-[#00C4E2] after:scale-x-100 opacity-100'
                  : 'opacity-70 hover:opacity-100 after:scale-x-0'
              } after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-[#00C4E2] after:origin-left after:transition-transform`}
            >
              {label}
            </Link>
          ))}

          <div className="ml-6 relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C4E2] focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link
                href="/create-blog"
                className="flex items-center gap-1 bg-[#00C4E2] text-white px-3 py-1.5 rounded hover:bg-[#00b8d4] transition"
              >
                <FiPlus size={16} />
                <span>Create Blog</span>
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                  aria-label="User menu"
                >
                  <FiUser size={20} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 min-w-[180px] bg-white border rounded-lg shadow-xl z-50 text-sm overflow-hidden">
                    <div className="px-4 py-3 text-gray-700 bg-gray-50 font-medium border-b">
                      {currentUser.email}
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="ml-4 flex gap-2">
              <Link href="/login">
                <button className="text-sm px-4 py-2 border border-[#00C4E2] text-[#00C4E2] rounded hover:bg-[#00C4E2] hover:text-white transition">
                  Masuk
                </button>
              </Link>
              <Link href="/register">
                <button className="text-sm px-4 py-2 bg-[#00C4E2] text-white rounded hover:opacity-90 transition">
                  Daftar
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
