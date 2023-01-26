import React from 'react'
import PropTypes from "prop-types"

const Footer = ({caption, username}) => {
  return (
    <div className='p-4 pt-2 pb-0'>
        <span className='mr-1 font-bold'>{username}</span><span className=''>
            {caption}
        </span>
    </div>
  )
}


Footer.propTypes = {
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}

export default Footer