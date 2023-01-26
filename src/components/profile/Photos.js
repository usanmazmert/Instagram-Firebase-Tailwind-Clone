import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Photos = ({photos}) => {
  return (
    <div className='h-16 border-t border-gray-primary mt-12 pt-4'>
        <div className='grid grid-cols-3 gap-8 mt-4 mb-12'>
            {!photos ? (
                <Skeleton count={12} width={320} height={400} />
            ) : photos.length > 0 ? (
                photos.map((photo) => <div key={photo.docId} className="relative group">
                    <img src={photo.imageSrc} alt={photo.caption} />
                    <div className='hidden absolute bottom-0 left-0 bg-gray-900 bg-opacity-30 z-10 w-full justify-evenly items-center h-full group-hover:flex'>
                        <p className='flex items-center text-white font-bold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 mr-4 select-none cursor-pointer text-white`}>
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                            {photo.likes.length}
                        </p>
                        <p className='flex items-center text-white font-bold'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-8 mr-4 select-none cursor-pointer`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                            </svg>
                            {photo.comments.length}
                        </p>

                    </div>
                </div>
            )
            ) : null}
        </div>
        {!photos || (photos.length === 0 && <p className='text-center text-2xl'>No Posts Yet!</p>)}
    </div>
  )
}

export default Photos