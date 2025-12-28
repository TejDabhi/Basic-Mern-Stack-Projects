## 🔐 Admin & User Login Using Props (MERN Stack)

This project implements **role-based authentication** in a MERN Stack application, where **Admin** and **User** logins are handled using **props** to control UI access and navigation.

--

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Role-based login (Admin / User)

--

## ⚙️ How It Works

### 1️⃣ Login Process
- The user selects a **role** (Admin or User) during login.
- Login credentials and role are sent to the backend using **Axios**.
- The backend verifies:
  - Username existence
  - Password correctness
  - Role validity

--

### 2️⃣ Backend Authentication Logic
- Separate collections (or logic) can be used for Admin and User.
- On successful login, the server returns:
  - `login: true`
  - `role: "admin"` or `"user"`

Example response:
```json
{
  "login": true,
  "role": "admin",
  "message": "Success"
}
```

### 3️⃣ Code Flow
- 1 In Login.jsx
- First we make a form in Login.jsx
```
const [username,setUsername]=useState('')
const [password,setPassword]=useState('')
const [role,setRole]=useState('admin')
 return (
    <div>
        <h3>Login</h3>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Username  </label>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="">password  </label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="">Role  </label>
                <select name="role" id="" onChange={(e)=>setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                </select>
            </div>
            <div>
                <button type='submit'>
                    Login
                </button>
            </div>
        </form>
    </div>
  )
```
2 Login.jsx
```
const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/login',{username,password,role})
}
```
3 server/Models/Admin.js
```
const mongoose=require('mongoose')
const AdminModel=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
module.exports=mongoose.model('Admins',AdminModel)
```
4 seerver/index.js
```
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    if (role === "admin") {
        AdminModel.findOne({ username })
            .then(user => {

                if (!user) {
                    return res.json({ message: "Admin Not Found" });
                }

                if (user.password !== password) {
                    return res.json({ message: "Incorrect Password" });
                }

                return res.json({
                    login: true,
                    role: "admin",
                    message: "Success"
                });

            })
            .catch(err => {
                return res.json({ message: err });
            });
    } else {
        return res.json({ message: "Invalid role" });
    }
});
```
5 In Login.jsx
```
axios.post('http://localhost:3001/login',{username,password,role})
.then((res)=>{
    if(res.data.login && res.data.role==="admin"){
        navigate('/dashboard')
        alert('Welcome Admin ')
    }
    else if(res.data.login && res.data.role==="student"){
        navigate('/dashboard')
    }   
    else{
        alert(res.data.message)
    }
})
```
6. App.jsx
```
function App() {
  const [role,setRole]=useState('')// fetch role from Login.jsx  and paste that role to the Navbar
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
```
7 Login.jsx
```
const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/login',{username,password,role})
    .then((res)=>{
        if(res.data.login && res.data.role==="admin"){
            setRoleVar('admin')
            navigate('/dashboard')
            alert('Welcome Admin ')
        }
        else if(res.data.login && res.data.role==="student"){
            setRoleVar('student')
            navigate('/dashboard')
        }   
        else{
            alert(res.data.message)
        }
    })
}
```
8.Navbar.jsx
```
{role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
                
              </>
            )}
            {role === "" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">
                    Login
                  </Link>
                </li>
              </>
            )}
```
9. logout.jsx
```
const Logout = ({setRole}) => {
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:3001/logout")
        .then(res=>{
            if(res.data.logout){
                setRole('')
                navigate('/login')
            }
        })
    },[])
  return (
    <div>Logout</div>
  )
}

export default Logout
```
