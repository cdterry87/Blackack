// import Spade from 'assets/images/spade.png'
import Spade from 'icons/Spade'

function Welcome({ startGame, playerBank, playerBet, placeBet }) {
  return (
    <>
      <div
        className='bg-white p-12 border border-gray-300 shadow-xl rounded-xl w-full sm:w-auto dark:bg-gray-800 dark:text-white dark:border-gray-300'
        data-aos='fade-up'
        data-aos-delay='300'
        data-aos-duration='600'
        data-aos-once='true'
      >
        <div className='flex flex-col gap-8'>
          <div className='w-full flex items-center justify-center'>
            <Spade classes='w-20 h-20 text-gray-800 dark:text-gray-100' />
          </div>
          <h1 className='text-2xl sm:text-3xl text-center font-bold text-green-900 dark:text-gray-100'>
            Welcome to <br />
            React Blackjack!
          </h1>
          <hr />
          <div className='flex flex-col gap-2'>
            <h2 className='text-sm text-center font-semibold'>
              Place your bet!
            </h2>
            <div>
              <div className='grid grid-cols-2 gap-2 text-xs'>
                <button
                  className={`p-2 border-2 border-green-800 font-bold rounded-lg dark:border-blue-500 ${
                    playerBet === 50
                      ? 'bg-green-800 text-white hover:bg-green-900 hover:text-gray-100 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-800'
                      : 'bg-green-100  text-green-800 hover:bg-green-200 hover:text-green-950 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300 dark:hover:text-blue-900'
                  }`}
                  onClick={() => placeBet(50)}
                >
                  $50
                </button>
                <button
                  className={`p-2 border-2 border-green-800 font-bold rounded-lg dark:border-blue-500 ${
                    playerBet === 100
                      ? 'bg-green-800 text-white hover:bg-green-900 hover:text-gray-100 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-800'
                      : 'bg-green-100  text-green-800 hover:bg-green-200 hover:text-green-950 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300 dark:hover:text-blue-900'
                  }`}
                  onClick={() => placeBet(100)}
                >
                  $100
                </button>
                <button
                  className={`p-2 border-2 border-green-800 font-bold rounded-lg dark:border-blue-500 ${
                    playerBet === 250
                      ? 'bg-green-800 text-white hover:bg-green-900 hover:text-gray-100 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-800'
                      : 'bg-green-100  text-green-800 hover:bg-green-200 hover:text-green-950 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300 dark:hover:text-blue-900'
                  }`}
                  onClick={() => placeBet(250)}
                >
                  $250
                </button>
                <button
                  className={`p-2 border-2 border-green-800 font-bold rounded-lg dark:border-blue-500 ${
                    playerBet === 500
                      ? 'bg-green-800 text-white hover:bg-green-900 hover:text-gray-100 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-800'
                      : 'bg-green-100  text-green-800 hover:bg-green-200 hover:text-green-950 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300 dark:hover:text-blue-900'
                  }`}
                  onClick={() => placeBet(500)}
                >
                  $500
                </button>
              </div>
              <div className='text-xs font-bold mt-2'>
                Player Bank:{' '}
                <span
                  className={`underline ${
                    playerBank > 0
                      ? 'text-green-800 dark:text-blue-400'
                      : 'text-red-800 dark:text-red-400'
                  }`}
                >
                  {playerBank.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </span>
              </div>
            </div>
          </div>
          <button
            className='px-4 py-2 uppercase bg-green-900 text-white font-bold rounded-lg shadow-md hover:bg-green-950 transition duration-200 ease-in-out disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed dark:bg-blue-800'
            onClick={startGame}
            disabled={playerBet ? false : true}
          >
            Deal!
          </button>
        </div>
      </div>
    </>
  )
}

export default Welcome
