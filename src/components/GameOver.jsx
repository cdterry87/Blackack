function GameOver({ isWinner, statusMessage, endGame }) {
  return (
    <>
      <div className='w-auto'>
        <div className='w-full text-white flex flex-col md:flex-row items-center justify-between md:justify-center gap-4 md:gap-8 p-3 bg-green-800 rounded-lg border border-green-950'>
          <div className='text-sm flex flex-col text-center md:text-left'>
            <strong className='text-lg text-white font-bold uppercase'>
              {statusMessage}
            </strong>
            <span>
              {isWinner ? 'Congrats! You Win!' : 'Better luck next time!'}
            </span>
          </div>
          <button
            className='uppercase font-bold bg-white text-green-800 px-4 py-2 rounded-md hover:bg-gray-200 hover:text-green-900 transition duration-200 ease-in-out'
            onClick={endGame}
          >
            Retry
          </button>
        </div>
      </div>
    </>
  )
}

export default GameOver
