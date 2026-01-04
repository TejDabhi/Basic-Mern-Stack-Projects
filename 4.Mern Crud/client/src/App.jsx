import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          {/* Crud Operation */}
          <Route path='/create'  element={<CreateUser/>}></Route>
          <Route path='/edit/:id' element={<UpdateUser/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
  
}

export default App
