import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Books from './Books'
import AddBook from './AddBook'
import AddStudent from './AddStudent'
import Dashboard from './Dashboard'
import Logout from './Logout'
import Navbar from './Navbar'
import Login from './Login'
import { useState } from 'react'
import EditBook from './EditBook'

const App = () => {
  const [role,setRole]=useState('')
  const [admin,setAdmin]=useState('')
  return (
    <BrowserRouter>
      <Navbar role={role}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/books' element={<Books admin={admin}/>}></Route>
        <Route path='/addBook' element={<AddBook/>}></Route>
        <Route path='/editBook/:id' element={<EditBook/>}></Route>
        <Route path='/addStudent' element={<AddStudent/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/logout' element={<Logout setRole={setRole} setAdmin={setAdmin}/>}></Route>
        <Route path='/login' element={<Login setRoleVar={setRole} setAdmin={setAdmin}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App