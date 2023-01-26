import React from 'react'
import Skeleton from "react-loading-skeleton"
import usePhotos from '../hooks/use-photos'
import Post from "./post"

const Timeline = () => {

  const {photos} = usePhotos()

  return (
    <div className='container w-[60%] mx-auto col-span-2 md:col-span-1 md:w-[100%] md:ml-3'>
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => {
            return(<Skeleton key={index} count={2} width={320} height={320}/> )
          })}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content = {content}/>)
      ) : (
        <p className='text-center text-2xl'>Follow people to see photos</p>
      )
    }
    </div>
  )
}

export default Timeline