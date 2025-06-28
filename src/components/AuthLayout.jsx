import React, { Children, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { LoadingPage } from './index.js'

export default function AuthLayout({children, authentication = true}) {
    //determine children show krne hai ya nahi
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate ("/")
        }

        setLoader(false)

    },[authStatus, navigate,authentication])

  return loader ? <LoadingPage/> : <>{children}</>
}
