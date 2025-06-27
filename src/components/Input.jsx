import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    error,
    helperText,
    required = false,
    disabled = false,
    readOnly = false,
    ...props
}, ref) {
    const id = useId()
    
    return (
        <div className="w-full">
            {label && (
                <label 
                    className={`inline-block mb-2 text-sm font-medium ${
                        error ? 'text-red-700' : 'text-gray-700'
                    }`} 
                    htmlFor={id}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full ${
                    error 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                } ${
                    disabled || readOnly
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-60'
                        : 'bg-white text-gray-900'
                } ${className}`}
                ref={ref}
                id={id}
                disabled={disabled}
                readOnly={readOnly}
                {...props}
            />
            
            {/* Helper Text */}
            {helperText && !error && (
                <p className="mt-1 text-xs text-gray-500">
                    {helperText}
                </p>
            )}
            
            {/* Error Message */}
            {error && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                    <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    )
})

export default Input