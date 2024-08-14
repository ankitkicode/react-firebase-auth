
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/register'
import Login from './pages/login'
import PrivateRouute from './pages/privateRouute'
import Profile from './pages/profile'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={ < PrivateRouute> <Profile/> </PrivateRouute>} />
        {/* <Route path="/privateRouute" element={<PrivateRouute/>}/> */}
      </Routes>
    </div>
  )
}

export default App
