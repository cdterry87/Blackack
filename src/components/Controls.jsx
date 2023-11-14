function Controls({ hit, stay, exit }) {
  return (
    <>
      <div className='w-auto'>
        <div className='text-sm md:text-xl flex flex-row items-center justify-center gap-2 md:gap-4 p-2 md:p-3 bg-white rounded-lg'>
          <button
            className='w-16 uppercase bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition duration-200 ease-in-out md:w-32'
            onClick={hit}
          >
            Hit
          </button>
          <button
            className='w-16 uppercase bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-900 transition duration-200 ease-in-out md:w-32'
            onClick={stay}
          >
            Stay
          </button>
          <button
            className='w-16 uppercase bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-950 transition duration-200 ease-in-out md:w-32'
            onClick={exit}
          >
            Exit
          </button>
        </div>
      </div>
    </>
  )
}

export default Controls
