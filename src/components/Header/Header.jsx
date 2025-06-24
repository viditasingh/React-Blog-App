import React, { useState } from 'react'
import { Container, LogoutButton, Logo } from '../index'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      url: '/',
      active: true
    },
    {
      name: 'Login',
      url: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      url: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      url: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post', // Fixed: singular form
      url: '/add-post',
      active: authStatus
    }
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <Container>
        <nav className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo size="medium" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => 
                item.active ? (
                  <li key={item.name}>
                <button
                  onClick={() => navigate(item.url)}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50"
                >
                  {item.name}
                </button>
              </li>
                ) : null
              )}

              {authStatus && (
                <li>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => 
                item.active ? (
                  <Link
                    key={item.name}
                    to={item.url}
                    className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : null
              )}
              
              {authStatus && (
                <div className="px-3 py-2">
                  <LogoutButton />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header