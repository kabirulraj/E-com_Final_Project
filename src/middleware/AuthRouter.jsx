import React, { useEffect } from 'react'
import {  Outlet, useNavigate } from 'react-router-dom'

const AuthRouter = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/sign_in', { replace: true })
    }
  }, [navigate])

  return <Outlet />
}

export default AuthRouter
