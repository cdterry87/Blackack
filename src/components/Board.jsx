import React from 'react'
import Dealer from './Dealer'
import Player from './Player'

function Board({ isPlaying }) {
  return !isPlaying ? null : (
    <>
      <div className='h-screen bg-green-900'>
        <div className='h-full flex flex-col gap-16 items-center justify-center'>
          <Dealer />
          <Player />
        </div>
      </div>
    </>
  )
}

export default Board
