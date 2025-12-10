import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const navigate=useNavigate()
    const authtoken=JSON.parse(
        localStorage.getItem("auth")
    )
    useEffect(()=>{
        if(!authtoken){
            navigate('/login')
        }
    },[])
    if(authtoken){
        return children
    }
}

export default ProtectedRoute