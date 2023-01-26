import React, { useState } from 'react'
import PropTypes from "prop-types"
import {useUserContext} from "../../context/UserContext"
import {useGlobalContext} from "../../context/firebase"
import {arrayRemove, arrayUnion, doc, getFirestore, updateDoc} from "firebase/firestore"

const Actions = ({docId, totalLikes, likedPhoto, handleFocus}) => {
    const {
        user: {uid : userId = ""}
    } = useUserContext()

    const [toggleLiked, setToggleLiked] = useState(likedPhoto)
    const [likes, setLikes] = useState(totalLikes)
    const {firebase} = useGlobalContext()

    const handleToggleLiked = async () => {
        setToggleLiked(!toggleLiked)
        console.log(toggleLiked)

        await updateDoc(doc(getFirestore(firebase), `/photos/${docId}`), {
            likes: !toggleLiked ? arrayUnion(userId) : arrayRemove(userId)
        })

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
    }
  return (
    <>
    <div className='flex p-4 items-center'>
        <div onClick={handleToggleLiked} onKeyDown={(event) => {
            if(event.key === "Enter"){
                handleToggleLiked()
            }
        }} className='flex'>
            {toggleLiked ? 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 mr-4 select-none cursor-pointer text-red-600`}>
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                : 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-8 mr-4 select-none cursor-pointer text-gray-800`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                }
        </div>
        <div>
            <svg onClick={handleFocus} onKeyDown={(event) => {
                if(event.key === "Enter"){
                    handleFocus()
                }
            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-8 mr-4 select-none cursor-pointer`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
        </div>
    </div>
    <div className='p-4 py-0'>
        <p className='font-bold'>{likes} {likes === 1 ? "like" : "likes"}</p>
    </div>
    </>
  )
}


Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
}

export default Actions