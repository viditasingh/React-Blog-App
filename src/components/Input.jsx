import React, { useId, forwardRef } from 'react'

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    helperText,
    error,
    required = false,
    ...props
}, ref) {
    const id = useId()
    
    return (
        <div className="w-full">
            {label && (
                <label 
                    className="inline-block text-sm font-medium text-gray-700 mb-2 pl-1 transition-colors duration-200 hover:text-gray-900" 
                    htmlFor={id}
                >
                    {label}
                    {required && (
                        <span className="text-red-500 ml-1 font-semibold">*</span>
                    )}
                </label>
            )}
            <input
                type={type}
                className={`w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    hover:border-gray-400 hover:shadow-sm
                    transition-all duration-200 ease-in-out
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                    ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
                    ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-500 pl-1">{helperText}</p>
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600 pl-1 flex items-center">
                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    )
})

export default Input