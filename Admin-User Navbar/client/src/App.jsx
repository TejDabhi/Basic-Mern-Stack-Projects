import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import { useState } from 'react'
import Logout from './Logout'
import Home from './Home'

function App() {
  const [role,setRole]=useState('')
  return(
    <BrowserRouter>
      <Navbar role={role}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login setRoleVar={setRole}/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/logout' element={<Logout setRole={setRole}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
