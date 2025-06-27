import React, { useId, forwardRef } from 'react'

const Select = forwardRef(function Select({
    options,
    label,
    className = "",
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
            <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    hover:border-gray-400 hover:shadow-sm
                    transition-all duration-200 ease-in-out
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                    ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
})

export default Select