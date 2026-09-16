import React from 'react'
import { useAuthContext } from '../context/AuthProvider'
import {useEffect} from 'react';
import useApi from '../../shared/useApi';

const Profile = () => {
  const authContext = useAuthContext();
  const api = useApi()
  
  async function fetchp(){
    const response = await api.get("/auth/me")
    authContext.setUser(response.data.data.user)
  }
  
  useEffect(()=>{
    fetchp()
  },[])
  
  return (
    <div>
      <p>name: {authContext.user?.name}</p>
      <p>email: {authContext.user?.email}</p>
    </div>
  )
}

export default Profile
