import React from 'react'
import { useGlobalContext } from '../context/firebase'
import { useUserContext } from '../context/UserContext'
import {Link} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import {signOut , getAuth} from "firebase/auth"
import useUser from '../hooks/use-user'

const Header = () => {
    const {user : {username}} = useUser()
    const {firebase} = useGlobalContext()
  return (
    <header className='h-16 bg-white border-b border-gray-primary mb-8 px-4'>
      <div className='container mx-auto max-w-screen-md h-full'>
        <div className='flex justify-between h-full'>
          <div className='text-gray-700 text-center flex items-center cursor-pointer'>
            <h1 className='w-full'>
              <Link to={ROUTES.DASHBOARD}>
                <img src='/images/logo.png' alt="instagram" className='mt-2 w-1/2'/>
              </Link>
            </h1>
          </div>
          <div className='text-gray-700 text-center flex items-center justify-between'>
            <div className='flex items-center w-24 justify-between'>
              <Link to="#" className=''>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

              </Link>
                <button type='button'
                  title='Sign Out'
                  onClick={() => signOut(getAuth(firebase))}
                > <Link to="/login"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              </Link>
              </button>
              <div className='cursor-pointer'>
                <Link to={`/p/${username}`}>
                  <img className='rounded-full h-8 w-8 flex'
                  src={`images/avatars/${username}.jpg`} alt={`${username} profile`}/>
                </Link>
              </div>
               
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header