import React from 'react'

export const LoadingPage = () => {
  return (
    <main className='flex w-full h-dvh justify-center items-end dark:bg-light_background bg-dark_background duration-300 z-[100]'>

      <div className="absolute w-full h-full flex justify-center items-center animate-pulse">
        <img src="./assets/logo_white.svg" className='w-12 aspect-square dark:invert rotating-element' alt='logo' />
      </div>
      {/* foot  */}
      <div className="flex items-center gap-3 justify-center h-24 relative overflow-hidden pt-14 px-6">
        <img src="./assets/logo_white.svg" className='w-32 max-md:w-16 aspect-square dark:invert' alt='logo' />
        <p className='text-[11rem] max-md:text-[6rem] font-medium dark:text-light_text text-dark_text'>Wintr</p>
      </div>
    </main>
  )
}
