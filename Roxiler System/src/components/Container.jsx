import React from 'react'

function Container({children}) {
  return (
    <div className='max-w-[1500px] w-full mx-auto'>
        {children}
    </div>
  )
}

export default Container