import React from 'react'

function Start({ isPlaying, onClick }) {
  return isPlaying ? null : (
    <>
      <div className='h-screen bg-gray-100 flex items-center justify-center'>
        <div className='p-4'>
          <div className='bg-white p-4 border border-gray-300 shadow-md rounded-lg'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-3xl text-center font-bold mb-4'>
                Welcome to the React Blackjack Game!
              </h1>
              <p className='text-sm md:text-xl text-center mb-4'>
                Click the button below to start playing. Good luck!
              </p>
              <button
                className='px-4 py-2 uppercase bg-emerald-400 text-white font-bold rounded-lg shadow-md hover:bg-emerald-500 transition duration-200 ease-in-out'
                onClick={onClick}
              >
                Deal!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Start
