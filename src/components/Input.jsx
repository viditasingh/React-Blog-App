import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = 'text',
  placeholder = '',
  error = '',
  helperText = '',
  required = false,
  disabled = false,
  size = 'medium',
  variant = 'default',
  leftIcon = null,
  rightIcon = null,
  className = '',
  ...props
}, ref) {
  const id = useId()

  // Size styles
  const sizeStyles = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-sm',
    large: 'px-4 py-4 text-base'
  }

  // Variant styles
  const variantStyles = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
  }

  // Base input styles
  const inputBaseStyles = 'w-full rounded-lg border bg-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed placeholder:text-gray-400'

  // Determine current variant based on error
  const currentVariant = error ? 'error' : variant

  // Combined input classes
  const inputClasses = `
    ${inputBaseStyles}
    ${sizeStyles[size]}
    ${variantStyles[currentVariant]}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  // Icon size based on input size
  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-5 h-5'
  }

  // Icon position based on input size
  const iconPositions = {
    small: 'top-2 left-3',
    medium: 'top-3.5 left-3',
    large: 'top-4 left-3'
  }

  const rightIconPositions = {
    small: 'top-2 right-3',
    medium: 'top-3.5 right-3',
    large: 'top-4 right-3'
  }

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          className="inline-block text-sm font-medium text-gray-700 mb-2" 
          htmlFor={id}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className={`absolute ${iconPositions[size]} pointer-events-none`}>
            <span className={`${iconSizes[size]} text-gray-400`}>
              {leftIcon}
            </span>
          </div>
        )}

        {/* Input Field */}
        <input
          id={id}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div className={`absolute ${rightIconPositions[size]} pointer-events-none`}>
            <span className={`${iconSizes[size]} text-gray-400`}>
              {rightIcon}
            </span>
          </div>
        )}
      </div>

      {/* Helper Text or Error Message */}
      {(helperText || error) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

export default Input