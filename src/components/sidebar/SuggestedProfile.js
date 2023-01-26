import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase'

const SuggestedProfile = ({docId, userId, username, sgUserId, sgDocId, following}) => {
    const [followed, setFollowed] = useState(false)

    let initialRender = false

    //Sayfa yenilendiğinde takip edilenler sağdan silinsin ama yenilenmediğinde silinmesin

    const handleFollow = () => {
        setFollowed(!followed)
        updateLoggedInUserFollowing(docId, sgUserId, followed);
        updateFollowedUserFollowers(userId, sgDocId, followed)
    }
    
  return (
    <div className='flex items-center align-items justify-between'>
        <div className='flex items-center justify-between'>
            <img className='rounded-full w-8 mr-3' src={`/images/avatars/${username}.jpg`} alt={`${username}`} />
            <Link to={`/p/${username}`}>
                <p className='font-bold text-sm'>{username}</p>
            </Link>
        </div>
        <div>
            <button className='text-xs font-bold text-blue-500' type='button' onClick={handleFollow}>
                {followed ? "Followed" : "Follow"}
            </button>
        </div>
    </div>
  )
}

SuggestedProfile.propTypes = {
    docId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    sgUserId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    sgDocId: PropTypes.string.isRequired
}

export default SuggestedProfile