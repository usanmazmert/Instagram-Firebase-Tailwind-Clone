import React, { useState } from 'react'
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import {formatDistance} from "date-fns"
import AddComment from './AddComment'

const Comments = ({docId, comments: allComments, posted, commentInput}) => {

    const [comments, setComments] = useState(allComments)
  return (
    <>
        <div className='p-4 pt-1 pb-4'>{comments.length >= 1 && (
            <p className='text-sm text-gray-400 mb-1 cursor-pointer'>View all {comments.length} comments</p>
        )}
        {
            comments.slice(0, 3).map((item, index) => (
                <p key={`${item.comment}-${item.displayName}`} className = "mb-1">
                    <Link to={`/p/${item.displayName}`}>
                        <span className='mr-1 font-bold'>{item.displayName}</span>
                    </Link>
                    <span>{item.comment.length > 100 ? item.comment.substring(0,100) + "..." : item.comment}</span>
                </p>
            ))
        }
            <p className='text-gray-400 uppercase text-xs mt-2'>{formatDistance(posted, new Date())} ago</p>
        </div>
        <AddComment docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput} />
    </>
  )
}


Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,
}
export default Comments