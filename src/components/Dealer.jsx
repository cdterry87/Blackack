import React from 'react'
import Card from './Card'

function Dealer({ dealerHand, gameDeck }) {
  const total = dealerHand.reduce((total, card) => {
    if (card.value === 'A') {
      return total > 10 ? total + 1 : total + 11
    } else if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
      return total + 10
    } else {
      return total + parseInt(card.value)
    }
  }, 0)

  return (
    <>
      <div className='w-full flex flex-col items-center gap-4'>
        <div className='flex flex-col gap-4 text-center'>
          <h1 className='text-lg md:text-3xl text-white font-bold'>Dealer</h1>
          <div className='flex flex-row gap-4'>
            {dealerHand.map((card, index) => (
              <div
                key={index}
                data-aos='fade-down'
                data-aos-duration='600'
                data-aos-delay={(index + 1 * (index + 1)) * 350}
                data-aos-once='true'
              >
                <Card card={card} className='flex flex-col gap-2' />
              </div>
            ))}
          </div>
          <div className='flex items-center justify-center text-xs'>
            <div className='px-4 py-2 bg-gray-950 text-white rounded-lg shadow-md'>
              Total: {total}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dealer
