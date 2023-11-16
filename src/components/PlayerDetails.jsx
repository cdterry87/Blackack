function PlayerDetails({ playerWins, playerLosses }) {
  playerWins = parseInt(playerWins)
  playerLosses = parseInt(playerLosses)

  let playerWinRatio = 0
  if (playerWins > 0 || playerLosses > 0) {
    playerWinRatio = (playerWins / (playerWins + playerLosses)).toFixed(2)
  }

  return (
    <>
      <div className='flex flex-col gap-1 text-white font-semibold bg-green-800 p-4 rounded-lg text-center border border-green-950'>
        <h3 className='font-bold text-lg uppercase'>Player Details</h3>
        <div className='flex items-center justify-between gap-6 text-xs'>
          <span>Wins: {playerWins}</span>
          <span>Losses: {playerLosses}</span>
          <span>Ratio: {playerWinRatio}</span>
        </div>
      </div>
    </>
  )
}

export default PlayerDetails
