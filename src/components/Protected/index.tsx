import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

const Protected = ({ children }: any) => {
  const { user }: any = UserAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])

  return children
}

export default Protected;