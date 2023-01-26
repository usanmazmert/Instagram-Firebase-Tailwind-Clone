import React, { useEffect } from 'react'
import Header from '../components/Header'
import Timeline from "../components/Timeline"
import Sidebar from "../components/sidebar"
import { getUserByUserId } from '../services/firebase'

const Dashboard = () => {
    useEffect(() => {
      document.title = "Instagram"
  }, [])
  return (
    <div className='bg-gray-100'>
      <Header/>
      <div className='grid grid-cols-2 gap-4 mx-auto max-w-screen-md'>
        <Timeline />
        <Sidebar/>
      </div>
    </div>
  )
}

export default Dashboard