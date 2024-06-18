import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader , setLoder] = useState(true)
    const authSatus = useSelector( state => state.auth.status)

    useEffect(()=>{
            if (authentication && authSatus !== authentication) {
                navigate("/login");
            }else if(!authentication && authSatus !== authentication) {
                navigate("/");
            }
            setLoder(false);
    },[authSatus, navigate, authentication])

  return loader ? <h1>Loading</h1> : <>{children}</>
}