import React from 'react'
import Controls from './Controls'
import Dealer from './Dealer'
import Player from './Player'

function Table({
  isPlaying,
  endGame,
  playerHand,
  dealerHand,
  dealCardToDealer,
  dealCardToPlayer
}) {
  if (!isPlaying) return null

  const stay = () => {
    // TODO: Move the "total" calculation for dealer and player to this component.
    // Then while the dealer's total is less than 17, deal cards to the dealer.
    dealCardToDealer()
  }

  const exit = () => {
    endGame()
  }

  return (
    <>
      <div className='min-h-screen bg-green-900'>
        <div className='p-4 w-full h-full flex flex-col gap-6 items-center justify-center'>
          <Dealer isPlaying={isPlaying} hand={dealerHand} />
          <hr className='w-1/2 border-2 border-green-800' />
          <Player hand={playerHand} />
          <Controls hit={dealCardToPlayer} stay={stay} exit={exit} />
        </div>
      </div>
    </>
  )
}

export default Table
