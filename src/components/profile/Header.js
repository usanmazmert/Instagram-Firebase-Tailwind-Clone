import React, { useEffect, useState } from 'react'
import Skeleton from "react-loading-skeleton"
import PropTypes from "prop-types"
import useUser from "../../hooks/use-user"
import { isUserFollowingProfile, toggleFollow, updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase'

const Header = ({photosCount, profile: {
  docId: profileDocId,
  userId: profileUserId,
  fullName,
  followers,
  following,
  username: profileUsername
}, followerCount, setFollowerCount}) => {

  const {user} = useUser()
  const [isFollowing, setIsFollowing] = useState(null)
  const activeBtnFollow = user?.username && user?.username !== profileUsername;


  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      setIsFollowing(!!isFollowing);
    };

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  const handleToggleFollow = async () => {
    setIsFollowing((isFollowing) => !isFollowing);
    setFollowerCount({
      followerCount: isFollowing ? followerCount - 1 : followerCount + 1
    });
    await updateLoggedInUserFollowing(user.docId, profileUserId, isFollowing);
    await updateFollowedUserFollowers(user.userId, profileDocId, isFollowing)
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername ? (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${fullName} profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && isFollowing === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            activeBtnFollow && (
              <button
                className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleToggleFollow();
                  }
                }}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
        </div>
      </div>
    </div>
  );
}

export default Header