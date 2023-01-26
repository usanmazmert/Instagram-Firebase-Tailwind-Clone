import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doesUsernameExists, getUserByUserId, getUserByUsername } from '../services/firebase'
import * as ROUTES from "../constants/routes"
import Header from '../components/Header'
import UserProfile from "../components/profile"

const Profile = () => {

    const {username} = useParams()
    const [userExists, setUserExists] = useState(false)
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        async function checkUserExists() {
            const usernameExists = await doesUsernameExists(username);
            if(!usernameExists){
                navigate(ROUTES.NOT_FOUND)
            }else{
                setUserExists(true)
                const userGotten = await getUserByUsername(username)
                setUser(userGotten)
            }   
        }
        checkUserExists()
    },[])
  return userExists ? (
    <div>
        <Header />
        <div className='mx-auto max-w-screen-lg'>
            <UserProfile user={user} />
        </div>
    </div>
  ) : null
}

export default Profile