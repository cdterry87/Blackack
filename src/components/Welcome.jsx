import Spade from 'assets/images/spade.png'

function Welcome({ deal }) {
  return (
    <>
      <div
        className='bg-white p-12 border border-gray-300 shadow-xl rounded-xl'
        data-aos='fade-up'
        data-aos-delay='300'
        data-aos-duration='600'
        data-aos-once='true'
      >
        <div className='flex flex-col gap-10'>
          <img src={Spade} alt='Blackjack' className='w-16 mx-auto' />
          <h1 className='text-2xl sm:text-3xl text-center font-bold text-green-900'>
            Welcome to <br />
            React Blackjack!
          </h1>
          <button
            className='px-4 py-2 uppercase bg-green-900 text-white font-bold rounded-lg shadow-md hover:bg-green-950 transition duration-200 ease-in-out'
            onClick={deal}
          >
            Deal!
          </button>
        </div>
      </div>
    </>
  )
}

export default Welcome
