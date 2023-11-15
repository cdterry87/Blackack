import Controls from 'components/Controls'
import Dealer from 'components/Dealer'
import Player from 'components/Player'

function Table({
  endGame,
  playerHand,
  dealerHand,
  playerHandTotal,
  dealerHandTotal,
  dealCardToDealer,
  dealCardToPlayer,
  setIsPlayerFinished
}) {
  const hit = () => {
    console.log('hit')
    dealCardToPlayer()
  }

  const stay = () => {
    console.log('stay')
    setIsPlayerFinished(true)
  }

  return (
    <>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <Dealer hand={dealerHand} total={dealerHandTotal} />
        <hr className='w-1/2 border-2 border-green-800' />
        <Player hand={playerHand} total={playerHandTotal} />
        <Controls hit={hit} stay={stay} exit={endGame} />
      </div>
    </>
  )
}

export default Table
