import React from 'react'

const username = ({ params }) => {
  return (
    <>
      {params.username}
      <div className='cover mt-16 w-full bg-red-50 relative'> {/* Add margin-top */}
        <img className='object-cover w-full h-[350px]' src='https://mytechshout.com/wp-content/uploads/2016/07/Bridge-facebook-HD-cover-photo.jpg' alt='Cover' />
        <div className='absolute -bottom-14 right-[48%] border-white border-2 rounded-lg'>
          <img className='rounded-full' width={100} height={100} src='https://pngfre.com/wp-content/uploads/1653590621914-999x1024.png' alt='Profile' />
        </div>
      </div>
    </>
  )
}

export default username
