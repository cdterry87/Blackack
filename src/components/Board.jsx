import React from 'react'
import Controls from './Controls'
import Dealer from './Dealer'
import Player from './Player'

function Board({ isPlaying, endGame }) {
  const hit = () => {
    console.log('hit')
  }

  const stay = () => {
    console.log('stay')
  }

  return !isPlaying ? null : (
    <>
      <div className='h-screen bg-green-900'>
        <div className='h-full flex flex-col gap-16 items-center justify-center'>
          <Dealer />
          <Player />
          <Controls hit={hit} stay={stay} exit={endGame} />
        </div>
      </div>
    </>
  )
}

export default Board
