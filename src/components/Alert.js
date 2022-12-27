import React from 'react'

export default function Alert({type, message}) {
  return (
    <div className='fixed-bottom m-5'>
      <div class={"alert alert-"+type} role="alert">
            {message}
        </div>
    </div>
  )
}
