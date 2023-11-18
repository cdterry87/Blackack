import Eye from 'icons/Eye'
import EyeSlash from 'icons/EyeSlash'

function ViewSwitcher({ playerViewTotals, changePlayerView }) {
  return (
    <>
      {playerViewTotals ? (
        <button
          onClick={() => changePlayerView(false)}
          alt='Showing Totals'
          title='Showing Totals'
        >
          <Eye classes='h-6 w-6 text-white cursor-pointer' />
        </button>
      ) : (
        <button
          onClick={() => changePlayerView(true)}
          alt='Hiding Totals'
          title='Hiding Totals'
        >
          <EyeSlash classes='h-6 w-6 text-white cursor-pointer' />
        </button>
      )}
    </>
  )
}

export default ViewSwitcher
