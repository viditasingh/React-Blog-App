import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'


export default function LogoutButton() {
    const dispatch = useDispatch();
    const logoutHandler = () =>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
        <button 
            onClick={logoutHandler}
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-600 cursor-pointer to-gray-700 rounded-lg hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md group'
        >
            {/* Logout Icon */}
            <svg 
                className="w-4 h-4 mr-2 text-gray-200 group-hover:text-white transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
            </svg>
            Logout
        </button>
  )
}
