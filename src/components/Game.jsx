import React from 'react'
import Controls from './Controls'
import Dealer from './Dealer'
import Player from './Player'

function Game({ isPlaying, endGame, gameDeck, playerHand, dealerHand }) {
  if (!isPlaying) return null

  console.log('gameDeck', gameDeck)
  console.log('playerHand', playerHand)
  console.log('dealerHand', dealerHand)

  const hit = () => {
    console.log('hit')
  }

  const stay = () => {
    console.log('stay')
  }

  const exit = () => {
    endGame()
  }

  return (
    <>
      <div className='min-h-screen bg-green-900'>
        <div className='p-4 w-full h-full flex flex-col gap-6 items-center justify-center'>
          <Dealer dealerHand={dealerHand} gameDeck={gameDeck} />
          <hr className='w-1/2 border-2 border-green-800' />
          <Player playerHand={playerHand} gameDeck={gameDeck} />
          <Controls hit={hit} stay={stay} exit={exit} />
        </div>
      </div>
    </>
  )
}

export default Game
