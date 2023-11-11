import React from 'react'

function PlayerControls({ hit, stay }) {
  return (
    <>
      <div className='flex items-center gap-4 p-4 bg-white rounded-lg'>
        <button
          className='uppercase text-xl bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out w-32'
          onClick={hit}
        >
          Hit
        </button>
        <button
          className='uppercase text-xl bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out w-32'
          onClick={stay}
        >
          Stay
        </button>
      </div>
    </>
  )
}

export default PlayerControls
