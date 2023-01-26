import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/firebase';
import {signInWithEmailAndPassword, getAuth} from "firebase/auth"
import {firebase} from "../lib/firebase"
import * as ROUTES from "../constants/routes"

const Login = () => {
    const navigate = useNavigate();
    const {firebase} = useGlobalContext()
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [error, setError] = useState("");
    const isInvalid = password === "" || email === "";

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(getAuth(firebase), email, password)
            navigate(ROUTES.DASHBOARD)
        }catch(error){
            setEmail("")
            setPassword("")
            setError(error.message)
        }
    }

    useEffect(() => {
        document.title = "Login - Instagram"
    }, [])
  return (
    <div className='container flex mx-auto max-w-screen-md items-center justify-between p-6 h-screen'>
        <div className='flex w-2/5 min-w-[60%]'>
            <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" className='max-w-full'/>
        </div>
        <div className='flex flex-col w-2/5 min-w-[150px]'>
            <h1>
                <img src= "/images/logo.png" alt="Instagram" className='mt-2 w-1/2 mb-4'/>
            </h1>
            {error && <p className='mb-4 text-xs text-red-500'>{error}</p>}
            <form onSubmit={handleLogin}>
                <input placeholder="Email adress"
                value={email}
                type="email"
                aria-label="Enter your email adress"
                className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-300 rounded mb-2 '
                onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Email adress"
                value={password}
                type="password"
                aria-label="Enter your email adress"
                className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-300 rounded mb-2'
                onChange={(e) => setPassword(e.target.value)} />
                <button disabled={isInvalid} type="submit" className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${isInvalid && "opacity-50"}`}>Log In</button>
            </form>
            <div className='mt-3'>
                <p className='text-sm'>
                Don't have an account? <Link to="/signup" className="text-blue-500 cursor-pointer">Sign Up</Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login