# 🔐 Password Security with bcrypt (MERN Stack)

This MERN stack application uses bcrypt to securely manage user passwords during registration and login.
bcrypt ensures passwords are never stored in plain text and provides strong protection against common security attacks.

⚙️ bcrypt Functionalities
## 1️⃣ Password Hashing (Signup)

During user registration, the password is hashed before storing it in MongoDB.
const bcrypt = require("bcrypt");
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
Converts plain password into a secure hash
Automatically adds a unique salt
Stores only the hashed password in the database

✅ Used in Signup API
```app.post('/register',(req,res)=>{
    const {name,email,password}=req.body
    bcrypt.hash(password,10)
    .then(hash=>{
        EmployeeModel.create({name,email,password:hash})
        .then((user)=>{
            return res.json(user)
        })
        .catch(err=>{
            return res.json(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
```
## 2️⃣ Password Comparison (Login)

During login, bcrypt compares the entered password with the stored hash.
const isMatch = await bcrypt.compare(password, user.password);
Returns true if passwords match
Returns false if credentials are invalid
Original password is never revealed
```
app.post('/login',(req,res)=>{
    const {email,password}=req.body
    EmployeeModel.findOne({email})
    .then((user)=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(err){
                    return res.json({message:"The password is incorrect"})
                }
                if(response){
                    return res.json({message:"The password is correct"})

                }
            })
        }else{
            return res.json({message:"No record Existed"})
        }

    })
    .catch(err=>{
        return res.json(err)
    })
})
```

## 🔄 Authentication Flow

User signs up with email and password
Password is hashed using bcrypt
Hashed password is stored in MongoDB
User logs in with credentials
bcrypt compares entered password with stored hash
User is authenticated if passwords match

## 🛡️ Security Advantages

No plain-text password storage
Automatic salting for each password
Resistant to brute-force and rainbow-table attacks
Industry-standard security practice for MERN apps


bcrypt provides secure hashing and comparison mechanisms that are essential for safe authentication in MERN stack applications. This implementation follows best practices for handling sensitive user credentials.
