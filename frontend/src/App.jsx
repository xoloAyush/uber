import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainRegister'
import { useUser } from './context/userContext'

const App = () => {

  const user = useUser();

  console.log(user)

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<UserRegister />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/captain-signup' element={<CaptainRegister />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
    </Routes>
  )
}

export default App