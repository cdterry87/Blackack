import React from 'react'
import Card from './Card'

function Dealer({ hand, total, isGameOver }) {
  return (
    <>
      <div className='w-full flex flex-col items-center gap-4'>
        <div className='flex flex-col gap-4 text-center'>
          <h1 className='text-lg md:text-3xl text-white font-bold'>Dealer</h1>
          <div className='flex flex-row gap-4'>
            {hand.map((card, index) => (
              <div
                key={index}
                data-aos='fade-down'
                data-aos-duration='600'
                data-aos-delay={
                  index < 2 ? (index + 1 * (index + 1)) * 350 : 250
                }
                data-aos-once='true'
              >
                <Card
                  card={card}
                  isFaceDown={index === 1}
                  className='flex flex-col gap-2'
                />
              </div>
            ))}
          </div>
          <div className='flex items-center justify-center text-xs'>
            <div className='px-4 py-2 bg-gray-950 text-white rounded-lg shadow-md'>
              Total: {isGameOver ? total : '??'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dealer
