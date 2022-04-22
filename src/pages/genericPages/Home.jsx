import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'

const Home = () => {
  const { user } = useContext(AuthContext)
  const nav = useNavigate()
  useEffect(() => {
    if (user && user.role === 'patient') {
      nav('/patient',{replace:true})
    }
    if (user && user.role === 'doctor') {
      nav('/doctor',{replace:true})
    }
    if (user && user.role === 'pharmacist') {
      nav('/pharmacist',{replace:true})
    }
  }, [user])
  
  return (
    <div className='container' style={{marginTop:'15%'}}>
      <h1 className='mb-5'>Welcome to E-HealthInsurance Web Site</h1>
      <p>Discover our website services by
        Signning up a new account or login if you already got an account!</p>
    </div>
  )
}

export default Home