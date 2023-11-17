import Club from 'icons/Club'
import Diamond from 'icons/Diamond'
import Heart from 'icons/Heart'
import Spade from 'icons/Spade'

function Card({ card, isFaceDown }) {
  const { suit, value } = card

  return (
    <>
      <div>
        <div className='bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg flex flex-col gap-2 md:gap-4 items-center justify-center w-16 h-24 md:w-24 md:h-32 select-none'>
          {isFaceDown && (
            <div className='h-full w-full bg-blue-900 dark:bg-blue-950 rounded-lg border-4 border-white dark:border-blue-800 flex items-center justify-center'>
              <Spade classes='w-16 h-16 text-white dark:text-blue-800' />
            </div>
          )}
          {!isFaceDown && suit === 'spades' && (
            <Spade classes='w-8 h-8 text-blue-600' />
          )}
          {!isFaceDown && suit === 'diamonds' && (
            <Diamond classes='w-8 h-8 text-red-600' />
          )}
          {!isFaceDown && suit === 'clubs' && (
            <Club classes='w-8 h-8 text-blue-600' />
          )}
          {!isFaceDown && suit === 'hearts' && (
            <Heart classes='w-8 h-8 text-red-600' />
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
