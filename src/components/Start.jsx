import React from 'react'
import Spade from '../assets/images/spade.png'

function Start({ isPlaying, startGame }) {
  return isPlaying ? null : (
    <>
      <div className='bg-white p-12 border border-gray-300 shadow-xl rounded-xl'>
        <div className='flex flex-col gap-10'>
          <img src={Spade} alt='Blackjack' className='w-16 mx-auto' />
          <h1 className='text-2xl sm:text-3xl text-center font-bold text-green-900'>
            Welcome to <br />
            React Blackjack!
          </h1>
          <hr />
          <button
            className='px-4 py-2 uppercase bg-green-900 text-white font-bold rounded-lg shadow-md hover:bg-green-950 transition duration-200 ease-in-out'
            onClick={startGame}
            data-aos='fade-up'
            data-aos-duration='600'
            data-aos-once='true'
          >
            Deal!
          </button>
        </div>
      </div>
    </>
  )
}

export default Start
