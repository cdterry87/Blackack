function Controls({ hit, stay, exit }) {
  return (
    <>
      <div className='w-auto'>
        <div className='text-sm md:text-xl flex flex-row items-center justify-center gap-2 md:gap-4 p-2 md:p-3 bg-green-800 rounded-lg border border-green-950'>
          <button
            className='w-16 border border-green-950 uppercase font-bold bg-white text-green-800 px-4 py-2 rounded-md hover:bg-gray-200 hover:text-green-900 transition duration-200 ease-in-out md:w-32'
            onClick={hit}
          >
            Hit
          </button>
          <button
            className='w-16 border border-green-950 uppercase font-bold bg-white text-blue-800 px-4 py-2 rounded-md hover:bg-gray-200 hover:text-blue-900 transition duration-200 ease-in-out md:w-32'
            onClick={stay}
          >
            Stay
          </button>
          <button
            className='w-16 border border-green-950 uppercase font-bold bg-white text-red-800 px-4 py-2 rounded-md hover:bg-gray-200 hover:text-red-900 transition duration-200 ease-in-out md:w-32'
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
