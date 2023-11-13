import React from 'react'
import Club from './icons/Club'
import Diamond from './icons/Diamond'
import Heart from './icons/Heart'
import Spade from './icons/Spade'

function Card({ card }) {
  const { suit, value, isFaceDown } = card

  return (
    <>
      <div>
        <div className='bg-white rounded-lg flex flex-col gap-4 items-center justify-center w-16 h-24 md:w-24 md:h-32'>
          {isFaceDown && (
            <div className='h-full w-full bg-blue-900 rounded-lg border-4 border-white'></div>
          )}
          {!isFaceDown && suit === 'spades' && (
            <Spade fill='black' classes='w-8 h-8' />
          )}
          {!isFaceDown && suit === 'diamonds' && (
            <Diamond fill='red' classes='w-8 h-8' />
          )}
          {!isFaceDown && suit === 'clubs' && (
            <Club fill='black' classes='w-8 h-8' />
          )}
          {!isFaceDown && suit === 'hearts' && (
            <Heart fill='red' classes='w-8 h-8' />
          )}
          {!isFaceDown && (
            <span className='text-xl md:text-2xl font-bold'>{value}</span>
          )}
        </div>
      </div>
    </>
  )
}

export default Card
