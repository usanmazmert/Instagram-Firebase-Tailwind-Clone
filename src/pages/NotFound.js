import React, { useEffect } from 'react';
import Header from "../components/Header.js"

const NotFound = () => {
    useEffect(() => {
        document.title = "Not Found!"
    }, [])
  return (
    <div>
        <Header />
        <div className='mx-auto max-w-screen-lg'>
            <p className='text-center text-2xl'>Not Found!</p>
        </div>
    </div>
  )
}

export default NotFound