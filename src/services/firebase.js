import {collection, getFirestore, getDocs, query, collectionGroup, limit,where, getDoc, updateDoc, arrayRemove, doc, arrayUnion} from "firebase/firestore"
import {FieldValue, firebase} from "../lib/firebase"

export const doesUsernameExists = async (username, email) => {
    let exist = ""
    const users = await getDocs(query(collectionGroup(getFirestore(firebase), "users")))
    users.forEach((user) => {
        if(username.toLowerCase() == user.data().username.toLowerCase() && username){
            exist = "This username already in use"
        }else if(email == user.data().email && email){
            exist = "This email has already been taken"
        }
    })
    return exist
}

export async function getUserByUserId(userId){
    const result = await getDocs(query(collection(getFirestore(firebase), "users"), where("userId", "==", userId)))
    const users = result.docs.map((user) => ({ 
        ...user.data(),
        docId: user.id
    }))
    return users[0]
}

export async function getUserByUsername(username){
    const result = await getDocs(query(collection(getFirestore(firebase), "users"), where("username", "==", username)))
    const user = result.docs.map((user) => ({ 
        ...user.data(),
        docId: user.id
    }))
    return user[0]
}

export async function getSuggestedProfiles(userId, following) {
    const result = await getDocs(query(collection(getFirestore(firebase), "users"), limit(10)))
    const users = result.docs.map((user) =>  ({...user.data(), docId: user.id})).filter((user) => user.userId !== userId && !following.includes(user.userId))
    return users
}

export async function updateLoggedInUserFollowing(docId, sgUserId, isFollowed) {
    const userRef = doc(getFirestore(firebase), `/users/${docId}`)
    updateDoc(userRef, {
        following: !isFollowed ? arrayUnion(sgUserId) : arrayRemove(sgUserId)
    })
}

export async function updateFollowedUserFollowers(userId, sgDocId, isFollowed) {
    const userRef = doc(getFirestore(firebase), `/users/${sgDocId}`)
    updateDoc(userRef, {
        followers: !isFollowed ? arrayUnion(userId) : arrayRemove(userId)
    })
}

export async function getPhotos(userId, following){
    const result = await getDocs(query(collection(getFirestore(firebase), "photos"), where("userId", "in", following))) 
    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }))
    // console.log(userFollowedPhotos)
    const photosWithUserDetails = Promise.all(
        userFollowedPhotos.map(async (photo) => {
                let userLikedPhoto = false
                if(photo.likes.includes(userId)){
                    userLikedPhoto = true
                }
                const { username } = await getUserByUserId(photo.userId)
                return { username, ...photo, userLikedPhoto }
            }
        )
    )
    return photosWithUserDetails

}


export async function getUserPhotos(userId) {
    const result = await getDocs(query(collection(getFirestore(firebase), "photos"), where("userId", "==", userId)))
    const photos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }))
    return photos
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await getDocs(query(collection(getFirestore(firebase), "users"), where('username', '==', loggedInUserUsername) ,where('following', 'array-contains', profileUserId)))
  
    const response = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));
    
    return response[0] ? response[0].userId : null;
  }

  export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
  ) {
    // 1st param: karl's doc id
    // 2nd param: raphael's user id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  
    // 1st param: karl's user id
    // 2nd param: raphael's doc id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateFollowedUserFollowers(followingUserId, profileDocId, isFollowingProfile);
  }