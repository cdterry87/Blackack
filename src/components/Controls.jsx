function Controls({ hit, stay, exit }) {
  return (
    <>
      <div className='w-full'>
        <div className='text-sm md:text-xl flex flex-row items-center justify-center gap-2 md:gap-4 p-2 md:p-3 bg-green-800 rounded-lg border border-green-950 dark:bg-gray-800 dark:border-gray-700'>
          <button
            className='w-full border border-green-950 uppercase font-bold bg-white text-green-800 px-4 py-2 rounded-md hover:bg-gray-200 hover:text-green-900 transition duration-200 ease-in-out dark:bg-gray-700 dark:text-green-300 dark:hover:bg-gray-600'
            onClick={hit}
          >
            Hit
          </button>
          <button
            className='w-full border border-green-950 uppercase font-bold bg-white text-blue-800 px-4 py-2 rounded-md hover:bg-gray-200 hover:text-blue-900 transition duration-200 ease-in-out dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600'
            onClick={stay}
          >
            Stay
          </button>
          <button
            className='w-full border border-green-950 uppercase font-bold bg-white text-red-800 px-4 py-2 rounded-md hover:bg-gray-200 hover:text-red-900 transition duration-200 ease-in-out dark:bg-gray-700 dark:text-red-300 dark:hover:bg-gray-600'
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
