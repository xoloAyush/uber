import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainRegister'
import Start from './pages/Start'
import Riding from './pages/Riding'

import UserContext from './context/userContext.jsx'
import UserProtectWrapper from './pages/UserProtectWrapper.jsx'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainContext from './context/captainContext.jsx'

const App = () => {

  const { user, setUser } = React.useContext(UserContext);

  const { captain, setCaptain } = React.useContext(CaptainContext);


  console.log(user)
  console.log(captain)

  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/signup' element={<UserRegister />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/captain-signup' element={<CaptainRegister />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
      <Route path='/home' element={
        <UserProtectWrapper>
          <Home />
        </UserProtectWrapper>
      } />

      <Route path='/captain-home' element={
        <CaptainProtectWrapper>
          <CaptainHome />
        </CaptainProtectWrapper>

      } />

      <Route path='/riding' element={<Riding />} />
    </Routes>
  )
}

export default App