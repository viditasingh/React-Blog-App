import { useDispatch } from 'react-redux'
import './App.css'
import { useState, useEffect } from 'react'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice.js'
import { Outlet } from 'react-router'
import { LoadingPage, Header, Footer } from './components/index.js'

function App() {
  
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
        // Fallback - treat as guest user
        console.log("Auth check failed:", error);
        dispatch(logout())
    })
    .finally(() => setLoading(false))
    }, [])
  

  return !loading?(
    <>
      <div className="min-h-screen py-4 px-4">
        <div className="w-full">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ): <LoadingPage/>;
}

export default App
