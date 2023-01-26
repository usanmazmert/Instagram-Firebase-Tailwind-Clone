import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/firebase';
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth"
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {firebase} from "../lib/firebase"
import * as ROUTES from "../constants/routes"
import { doesUsernameExists } from '../services/firebase';

const SignUp = () => {
    const navigate = useNavigate();
    const {firebase} = useGlobalContext()

    const [username, setUsername] = useState("")
    const [fullName, setFullName] = useState("")    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [error, setError] = useState("");
    const isInvalid = password === "" || email === "" || username === "" || fullName === "";

    const handleSignUp = async (e) => {
        e.preventDefault()
        try{
            const exist = await doesUsernameExists(username, email)
            if(exist)
                throw new Error(exist);
            const createdAcc = await createUserWithEmailAndPassword(getAuth(firebase), email, password);

            await updateProfile(createdAcc.user,{displayName: username});

            await addDoc(collection(getFirestore(firebase),"users"), {
                userId: createdAcc.user.uid,
                username: username.toLowerCase(),
                fullName,
                email: email.toLowerCase(),
                following: [],
                followers: [],
                dateCreated: Date.now()
            });
            navigate("/")
        }catch(error){
            setFullName("")
            setUsername("")
            setEmail("")
            setPassword("")
            setError(error.message)
            console.log(error)
            setTimeout(() => setError(""), 5000)
        }
    }

    useEffect(() => {
        document.title = "Sign Up - Instagram"
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
            <form onSubmit={handleSignUp}>
                <input placeholder="Username"
                value={username}
                type="text"
                aria-label="Enter your email adress"
                className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-300 rounded mb-2 '
                onChange={(e) => setUsername(e.target.value)} />
                <input placeholder="Full Name"
                value={fullName}
                type="text"
                aria-label="Enter your email adress"
                className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-300 rounded mb-2 '
                onChange={(e) => setFullName(e.target.value)} />
                <input placeholder="Email adress"
                value={email}
                type="email"
                aria-label="Enter your email adress"
                className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-300 rounded mb-2 '
                onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password"
                value={password}
                type="password"
                aria-label="Enter your password"
                className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-300 rounded mb-2'
                onChange={(e) => setPassword(e.target.value)} />
                <button disabled={isInvalid} type="submit" className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${isInvalid && "opacity-50"}`}>Sign Up</button>
            </form>
            <div className='mt-3'>
                <p className='text-sm'>
                Already have an account? <Link to="/login" className="text-blue-500 cursor-pointer">Sign In</Link>
                </p>
            </div>
        </div>
    </div>
  ) 
}

export default SignUp