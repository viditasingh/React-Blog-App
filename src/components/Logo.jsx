import React from 'react'
import { Link } from 'react-router'

function Logo({ 
  size = 'medium', 
  showText = true, 
  className = '', 
  variant = 'default' 
}) {
  
  // Size configurations
  const sizeConfig = {
    small: {
      icon: 'w-6 h-6',
      innerIcon: 'w-3 h-3',
      text: 'text-lg',
      spacing: 'mr-2'
    },
    medium: {
      icon: 'w-8 h-8',
      innerIcon: 'w-4 h-4',
      text: 'text-xl',
      spacing: 'mr-3'
    },
    large: {
      icon: 'w-12 h-12',
      innerIcon: 'w-6 h-6',
      text: 'text-2xl',
      spacing: 'mr-4'
    }
  }

  // Variant configurations
  const variantConfig = {
    default: {
      container: 'text-gray-900 hover:text-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-600 to-purple-600',
      iconInner: 'bg-white',
      iconInnerBg: 'bg-gradient-to-br from-blue-600 to-purple-600'
    },
    white: {
      container: 'text-white hover:text-blue-200',
      iconBg: 'bg-gradient-to-br from-blue-400 to-purple-400',
      iconInner: 'bg-white',
      iconInnerBg: 'bg-gradient-to-br from-blue-500 to-purple-500'
    },
    dark: {
      container: 'text-gray-100 hover:text-blue-400',
      iconBg: 'bg-gradient-to-br from-blue-500 to-purple-500',
      iconInner: 'bg-gray-900',
      iconInnerBg: 'bg-gradient-to-br from-blue-400 to-purple-400'
    }
  }

  const currentSize = sizeConfig[size]
  const currentVariant = variantConfig[variant]

  return (
    <>
      {/* Logo Icon */}
      <div className={`relative ${currentSize.icon} ${currentSize.spacing}`}>
        <div className={`absolute inset-0 ${currentVariant.iconBg} rounded-xl group-hover:shadow-lg transition-shadow duration-200`}></div>
        <div className={`absolute inset-1 ${currentVariant.iconInner} rounded-lg flex items-center justify-center`}>
          <div className={`${currentSize.innerIcon} ${currentVariant.iconInnerBg} rounded-md`}></div>
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-semibold leading-tight`}>
            Blog
          </span>
          {size === 'large' && (
            <span className="text-xs text-gray-500 font-medium -mt-1">
              Stories & Ideas
            </span>
          )}
        </div>
      )}
      </>
  )
}

export default Logo