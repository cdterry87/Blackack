function GameOver({ isWinner, statusMessage, endGame }) {
  return (
    <>
      <div className='w-1/2 md:w-full'>
        <div className='w-full flex flex-col md:flex-row items-center justify-between md:justify-center gap-4 md:gap-8 p-3 bg-white rounded-lg'>
          <div className='text-sm flex flex-col text-center md:text-left'>
            <strong className='text-lg text-green-900 font-bold uppercase'>
              {statusMessage}
            </strong>
            <span>
              {isWinner ? 'Congratulations!' : 'Better luck next time!'}
            </span>
          </div>
          <button
            className='uppercase bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-950 transition duration-200 ease-in-out'
            onClick={endGame}
          >
            End Game
          </button>
        </div>
      </div>
    </>
  )
}

export default GameOver
