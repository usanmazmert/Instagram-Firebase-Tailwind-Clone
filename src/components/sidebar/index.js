import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/use-user'
import Suggestions from './Suggestions'
import User from './User'

const Sidebar = () => {
  const {user : {docId, fullName, username, userId, following}} = useUser()
  return (
    <div className='p-4 hidden md:block'>
      <User username={username} fullName={fullName}/>
      <Suggestions userId={userId} following={following} docId={docId}/>
    </div>
  )
}

Sidebar.whyDidYouRender = true

export default Sidebar