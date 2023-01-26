import React, { useEffect, useReducer } from 'react'
import { getUserPhotos } from '../../services/firebase'
import Header from './Header'
import Photos from './Photos'

const Profile = ({user}) => {
    const initialState = {
        photosCollection: [],
        followerCount: 0
    }

    const reducer = (state, newState) => ({ ...state, ...newState });

    const [{photosCollection, followerCount}, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
        async function getPhotos() {
            const photos = await getUserPhotos(user.userId)
            dispatch({photosCollection: photos, followerCount: user.followers.length });
        }
        getPhotos()
    }, [user.userId])

  return (
    <>
        <Header photosCount={photosCollection.length} profile={user} followerCount={followerCount} setFollowerCount={dispatch}/>
        <Photos photos={photosCollection} />
    </>
  )
}

export default Profile