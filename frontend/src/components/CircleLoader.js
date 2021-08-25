import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinLoader = () => {
  return (
    /* <img src= "images/loading_Image.gif" alt="image" /> */
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default SpinLoader