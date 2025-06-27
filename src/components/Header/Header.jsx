import React, { useState } from 'react'
import { Container, LogoutButton, Logo } from '../index'
import { Link, useNavigate, useLocation } from 'react-router'
import { useSelector } from 'react-redux'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()

  // Navigation items for the left side
  const leftNavItems = [
    {
      name: 'Home',
      url: '/',
      active: true
    },
    {
      name: 'About',
      url: '/about',
      active: true 
    },
    {
      name: 'Contact',
      url: '/contact',
      active: true
    },
    {
      name: 'All Posts',
      url: '/all-posts',
      active: true
    },
    {
      name: 'Add Post',
      url: '/add-post',
      active: authStatus
    },
    {
      name: 'My Posts',
      url: '/my-posts',
      active: authStatus
    }
  ]

  // Authentication items for the right side
  const rightNavItems = [
    {
      name: 'Sign Up',
      url: '/signup',
      active: !authStatus,
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      name: 'Login',
      url: '/login',
      active: !authStatus,
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      )
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
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            
            {/* Left Navigation Items */}
            <div className="flex items-center space-x-6">
              <ul className="flex items-center space-x-6">
                {leftNavItems.map((item) => 
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.url)}
                        className="relative text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-all duration-300 group cursor-pointer"
                      >
                        <span className="relative z-10">{item.name}</span>
                        {/* Gradient underline */}
                        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                          location.pathname === item.url 
                            ? 'w-full opacity-100' 
                            : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                        }`}></div>
                      </button>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            {/* Right Authentication Items */}
            <div className="flex items-center space-x-4">
              {authStatus ? (
                /* Show Logout Button when authenticated */
                <LogoutButton />
              ) : (
                /* Show Sign Up and Login buttons when not authenticated */
                <ul className="flex items-center space-x-4">
                  {rightNavItems.map((item) => 
                    item.active ? (
                      <li key={item.name}>
                        <button
                          onClick={() => navigate(item.url)}
                          className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md group cursor-pointer ${
                            item.name === 'Login' 
                              ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25'
                              : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <span className="relative z-10 flex items-center">
                            {item.icon}
                            {item.name}
                          </span>
                          {/* Gradient underline for Sign Up only */}
                          {item.name === 'Sign Up' && (
                            <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                              location.pathname === item.url 
                                ? 'w-3/4 opacity-100' 
                                : 'w-0 group-hover:w-3/4 opacity-0 group-hover:opacity-100'
                            }`}></div>
                          )}
                        </button>
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </div>
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
              
              {/* Mobile Left Navigation Items */}
              {leftNavItems.map((item) => 
                item.active ? (
                  <Link
                    key={item.name}
                    to={item.url}
                    className={`relative text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md hover:bg-gray-50 ${
                      location.pathname === item.url ? 'text-gray-900 bg-gray-50' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    {/* Mobile gradient underline for active page */}
                    {location.pathname === item.url && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    )}
                  </Link>
                ) : null
              )}
              
              {/* Mobile Authentication Section */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                {authStatus ? (
                  <div className="px-3 py-2">
                    <LogoutButton />
                  </div>
                ) : (
                  <div className="space-y-1">
                    {rightNavItems.map((item) => 
                      item.active ? (
                        <Link
                          key={item.name}
                          to={item.url}
                          className={`relative flex items-center px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md ${
                            item.name === 'Login'
                              ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-300'
                          } ${location.pathname === item.url ? 'bg-gray-50' : ''}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          {item.name}
                          {/* Mobile gradient underline for Sign Up on active page */}
                          {item.name === 'Sign Up' && location.pathname === item.url && (
                            <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                          )}
                        </Link>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header