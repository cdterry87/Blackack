import Controls from 'components/Controls'
import Dealer from 'components/Dealer'
import Player from 'components/Player'
import GameOver from 'components/GameOver'

function Table({
  endGame,
  playerHand,
  dealerHand,
  playerHandTotal,
  dealerHandTotal,
  dealCardToDealer,
  dealCardToPlayer,
  setIsPlayerFinished,
  isGameOver,
  isWinner,
  statusMessage
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
      <div className='w-full flex flex-col gap-6 items-center justify-center'>
        <Dealer hand={dealerHand} total={dealerHandTotal} />
        <hr className='w-1/2 sm:w-full border-2 border-green-800 rounded-full' />
        <Player hand={playerHand} total={playerHandTotal} />
        {!isGameOver && <Controls hit={hit} stay={stay} exit={endGame} />}
        {isGameOver && (
          <GameOver
            isWinner={isWinner}
            statusMessage={statusMessage}
            endGame={endGame}
          />
        )}
      </div>
    </>
  )
}

export default Table
