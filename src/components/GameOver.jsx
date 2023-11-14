import Smile from 'icons/Smile'
import Frown from 'icons/Frown'

function GameOver({ isWinner, statusMessage, endGame }) {
  return (
    <>
      <div
        className='bg-white p-12 border border-gray-300 shadow-xl rounded-xl'
        data-aos='fade-down'
        data-aos-delay='300'
        data-aos-duration='600'
        data-aos-once='true'
      >
        <div className='flex flex-col items-center gap-4'>
          {isWinner && <Smile classes='w-32 h-32 text-green-900' />}
          {!isWinner && <Frown classes='w-32 h-32 text-green-900' />}
          <h1 className='text-2xl sm:text-3xl text-center font-bold text-green-900'>
            {isWinner ? 'Congratulations!' : 'Better luck next time!'}
          </h1>
          <h2 className='text-base sm:text-lg text-center font-semibold text-gray-800'>
            {statusMessage}
          </h2>
          <hr />
          <button
            className='px-4 py-2 uppercase bg-green-900 text-white font-bold rounded-lg shadow-md hover:bg-green-950 transition duration-200 ease-in-out'
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
