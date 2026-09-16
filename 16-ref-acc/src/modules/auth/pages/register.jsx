import React from 'react'
import useApi from '../../shared/useApi'
import { useState } from 'react'
import { useAuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router'
const Register = () => {
  const authContext = useAuthContext()
  const api = useApi()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  async function handleSubmit(event){
    event.preventDefault()
    const response = await api.post("/auth/register",{
      name, email, password
    })
    authContext.setUser(response.data.data.user)
    authContext.setAccessToken(response.data.accessToken)
    navigate("/profile");
  }
  return (
    <main>
      <form 
  className="flex flex-col gap-4 text-black"
  onSubmit={handleSubmit}>
  <input
    type="text"
    className="border p-2 rounded-sm"
    value={name}
    placeholder="name"
    onChange={e => setName(e.target.value)}
  />
  <input
    type="text"
    className="border p-2 rounded-sm"
    value={email}
    placeholder="email"
    onChange={e => setEmail(e.target.value)}
  />
  <input
    type="password"
    className="border p-2 rounded-sm"
    value={password}
    placeholder="password"
    onChange={e => setPassword(e.target.value)}
  />
  <button
    type="submit"
    className="border p-2 bg-blue-200 rounded-sm"
  >
    Register
  </button>
</form>
    </main>
  )
}

export default Register
