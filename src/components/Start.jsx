import React from 'react'

function Start({ isPlaying, startGame }) {
  return isPlaying ? null : (
    <>
      <div className='h-screen bg-green-900 flex items-center justify-center'>
        <div className='p-4'>
          <div className='bg-white p-12 border border-gray-300 shadow-xl rounded-xl'>
            <div className='flex flex-col gap-8'>
              <h1 className='text-xl md:text-3xl text-center font-bold text-green-900'>
                Welcome to <br />
                React Blackjack!
              </h1>
              <button
                className='px-4 py-2 uppercase bg-green-900 text-white font-bold rounded-lg shadow-md hover:bg-green-950 transition duration-200 ease-in-out'
                onClick={startGame}
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
