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

  let dealerTotal = dealerHand.reduce((total, card) => {
    if (card.value === 'A') {
      return total > 10 ? total + 1 : total + 11
    } else if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
      return total + 10
    } else {
      return total + parseInt(card.value)
    }
  }, 0)

  let playerTotal = playerHand.reduce((total, card) => {
    if (card.value === 'A') {
      return total > 10 ? total + 1 : total + 11
    } else if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
      return total + 10
    } else {
      return total + parseInt(card.value)
    }
  }, 0)

  /**
   * NOTE: The stay function is not running the dealCardToDealer function
   * properly to update the dealer's hand.
   */
  const stay = () => {
    console.log('stay', dealerTotal)
    while (dealerTotal < 17) {
      dealCardToDealer()
    }
  }

  const exit = () => {
    endGame()
  }

  return (
    <>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <Dealer hand={dealerHand} total={dealerTotal} />
        <hr className='w-1/2 border-2 border-green-800' />
        <Player hand={playerHand} total={playerTotal} />
        <Controls hit={dealCardToPlayer} stay={stay} exit={exit} />
      </div>
    </>
  )
}

export default Table
