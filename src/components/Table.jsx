import Controls from 'components/Controls'
import Dealer from 'components/Dealer'
import Player from 'components/Player'
import PlayerDetails from 'components/PlayerDetails'
import GameOver from 'components/GameOver'

function Table({
  endGame,
  playerHand,
  dealerHand,
  playerHandTotal,
  dealerHandTotal,
  dealCardsToDealer,
  dealCardToPlayer,
  isGameOver,
  isWinner,
  statusMessage,
  playerWins,
  playerLosses,
  playerBet,
  playerBank
}) {
  return (
    <>
      <div className='h-full w-full flex flex-col gap-6 items-center justify-center'>
        <PlayerDetails
          playerWins={playerWins}
          playerLosses={playerLosses}
          playerBet={playerBet}
          playerBank={playerBank}
        />
        <Dealer
          hand={dealerHand}
          total={dealerHandTotal}
          isGameOver={isGameOver}
        />
        <hr className='w-full border-2 border-green-800 rounded-full dark:border-blue-950' />
        <Player hand={playerHand} total={playerHandTotal} />
        <div className='w-full'>
          {!isGameOver && (
            <Controls
              hit={dealCardToPlayer}
              stay={dealCardsToDealer}
              exit={endGame}
            />
          )}
          {isGameOver && (
            <GameOver
              isWinner={isWinner}
              statusMessage={statusMessage}
              endGame={endGame}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Table
