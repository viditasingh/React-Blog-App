import React, { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()
    
    return (
        <div className='w-full'>
            {label && (
                <label 
                    htmlFor={id} 
                    className='inline-block text-sm font-medium text-gray-700 mb-2'
                >
                    {label}
                </label>
            )}
            
            <div className="relative">
                <select
                    {...props}
                    id={id}
                    ref={ref}
                    className={`w-full px-4 py-3 text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed appearance-none cursor-pointer transition-all duration-200 ease-in-out pr-10 ${className}`}
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg 
                        className="w-5 h-5 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 9l-7 7-7-7" 
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default React.forwardRef(Select)