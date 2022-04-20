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
    <div></div>
  )
}

export default Home