import React from 'react'
import PlayerControls from './PlayerControls'

function Player() {
  const hit = () => {
    console.log('hit')
  }

  const stay = () => {
    console.log('stay')
  }

  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <div>Player</div>
        <PlayerControls hit={hit} stay={stay} />
      </div>
    </>
  )
}

export default Player
