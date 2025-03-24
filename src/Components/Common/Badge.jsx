import React from 'react'

function Badge({text}) {
  return (
    <div className='flex items-center mb-1 sm:mb-2 md:mb-1 z-10'>
      <span 
        className={`
          border 
          border-black
          text-black
          shadow-sm
          px-3
          py-1 
          rounded-full 
          text-xs 
          sm:text-xs 
          font-semibold 
          transition-colors
        `}
      >
        {text}
      </span>
    </div>
  )
}

export default Badge