import React, { useState } from 'react'
import PropTypes from "prop-types"
import { useGlobalContext } from '../../context/firebase'
import { useUserContext } from '../../context/UserContext'
import { arrayUnion, collection, doc, getFirestore, updateDoc } from 'firebase/firestore'

const AddComment = ({docId, commentInput, comments, setComments}) => {

    const [comment, setComment] = useState("")
    const {firebase} = useGlobalContext();
    const { user: {displayName} } = useUserContext()


    const handleSubmitComment = (event) => {
        event.preventDefault()
        if(!comment)
            return;

        setComments([...comments, {comment, displayName}])
        setComment("")
        return updateDoc(doc(collection(getFirestore(firebase), "photos"), docId), {
          comments: arrayUnion({comment, displayName})
        })
    }

  return (
    <div className='border-t border-gray-200'>
        <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-500 ${!comment && 'opacity-25'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  )
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object.isRequired
}

export default AddComment