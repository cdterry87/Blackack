import { useEffect } from 'react'
import Controls from 'components/Controls'
import Dealer from 'components/Dealer'
import Player from 'components/Player'

function Table({
  endGame,
  playerHand,
  dealerHand,
  dealCardToDealer,
  dealCardToPlayer,
  determineWinner
}) {
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

  const stay = () => {
    console.log('stay', dealerTotal)
  }

  useEffect(() => {
    determineWinner()
  }, [playerTotal, dealerTotal, determineWinner])

  return (
    <>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <Dealer hand={dealerHand} total={dealerTotal} />
        <hr className='w-1/2 border-2 border-green-800' />
        <Player hand={playerHand} total={playerTotal} />
        <Controls hit={dealCardToPlayer} stay={stay} exit={endGame} />
      </div>
    </>
  )
}

export default Table
