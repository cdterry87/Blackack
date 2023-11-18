import { useState, useEffect } from 'react'

import Table from 'components/Table'
import Welcome from 'components/Welcome'
import ThemeSwitcher from 'components/ThemeSwitcher'
import ViewSwitcher from 'components/ViewSwitcher'
import deck from 'data/deck.json'

import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  AOS.init() // Initialize Animations

  const initialPlayerBank = 5000 // Initial player bank amount

  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isPlayerFinished, setIsPlayerFinished] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWinner, setIsWinner] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [playerHand, setPlayerHand] = useState([])
  const [playerHandTotal, setPlayerHandTotal] = useState(0)
  const [dealerHand, setDealerHand] = useState([])
  const [dealerHandTotal, setDealerHandTotal] = useState(0)
  const [gameDeck, setGameDeck] = useState([...deck])
  const [playerWins, setPlayerWins] = useState(0)
  const [playerLosses, setPlayerLosses] = useState(0)
  const [playerBank, setPlayerBank] = useState(initialPlayerBank)
  const [playerBet, setPlayerBet] = useState(0)
  const [playerViewTotals, setPlayerViewTotals] = useState('')

  const placeBet = bet => {
    if (bet > 500) bet = 500
    if (bet < 50) bet = 50
    setPlayerBet(bet)
  }

  const shuffleAndDeal = () => {
    let tempGameDeck = [...gameDeck]
    let tempPlayerHand = []
    let tempDealerHand = []

    // Start the game and set player wins and losses
    setIsGameStarted(true)

    // Shuffle the deck
    for (let i = 0; i < tempGameDeck.length - 1; i++) {
      let j = i + Math.floor(Math.random() * (tempGameDeck.length - i))
      let temp = tempGameDeck[j]
      tempGameDeck[j] = tempGameDeck[i]
      tempGameDeck[i] = temp
    }

    // Add the first card to player's hand and then remove it from the deck
    tempPlayerHand.push(tempGameDeck[0])
    tempGameDeck = [...tempGameDeck.filter((card, index) => index !== 0)]

    // Add the second card to the dealer's hand and then remove it from the deck
    tempDealerHand.push(tempGameDeck[0])
    tempGameDeck = [...tempGameDeck.filter((card, index) => index !== 0)]

    // Add the third card to player's hand and then remove it from the deck
    tempPlayerHand.push(tempGameDeck[0])
    tempGameDeck = [...tempGameDeck.filter((card, index) => index !== 0)]

    // Add the fourth card to the dealer's hand and then remove it from the deck
    tempDealerHand.push(tempGameDeck[0])
    tempGameDeck = [...tempGameDeck.filter((card, index) => index !== 0)]

    // Calculate the player's hand total
    let tempPlayerHandTotal = calculateHandTotal(tempPlayerHand)

    // Calculate the dealer's hand total
    let tempDealerHandTotal = calculateHandTotal(tempDealerHand)

    // Set the state
    setGameDeck(tempGameDeck)
    setPlayerHand(tempPlayerHand)
    setDealerHand(tempDealerHand)
    setPlayerHandTotal(tempPlayerHandTotal)
    setDealerHandTotal(tempDealerHandTotal)
  }

  const dealCardToPlayer = () => {
    let tempGameDeck = [...gameDeck]
    let tempPlayerHand = [...playerHand]

    // Add the first card to player's hand
    tempPlayerHand.push(tempGameDeck[0])

    // Calculate the player's hand total
    let tempHandTotal = calculateHandTotal(tempPlayerHand)

    // Set state
    setPlayerHand(tempPlayerHand)
    setGameDeck(gameDeck => [...gameDeck.filter((card, index) => index !== 0)])
    setPlayerHandTotal(tempHandTotal)
  }

  const dealCardsToDealer = () => {
    let tempGameDeck = [...gameDeck]
    let tempDealerHand = [...dealerHand]
    let tempHandTotal = calculateHandTotal(tempDealerHand)
    let dealerHitCount = 0

    // Player is finished with their turn
    setIsPlayerFinished(true)

    // Dealer must hit until they reach 17, so keep dealing the first card
    // and removing it from the deck until the dealer's hand total is 17 or greater
    while (tempHandTotal < 17) {
      // This should never happen, but in order to prevent an infinite loop break out if
      // the dealer hits more than 10 times since this shouldn't be possible without busting
      if (dealerHitCount > 10) break

      tempDealerHand.push(tempGameDeck[0])
      tempGameDeck = [...tempGameDeck.filter((card, index) => index !== 0)]
      tempHandTotal = calculateHandTotal(tempDealerHand)

      // Counts the number of times the dealer hits
      dealerHitCount++
    }

    // Set state
    setDealerHand(tempDealerHand)
    setGameDeck(gameDeck => [...gameDeck.filter((card, index) => index !== 0)])
    setDealerHandTotal(tempHandTotal)
  }

  const calculateHandTotal = hand => {
    let ace
    let value = hand.reduce((sum, current) => {
      ace |= current.value === 1
      sum += current.value
      return sum
    }, 0)
    if (ace && value + 10 <= 21) {
      value += 10
    }
    return value
  }

  const endGame = () => {
    setIsGameStarted(false)
    setIsPlayerFinished(false)
    setIsGameOver(false)
    setIsWinner(null)
    setStatusMessage('')
    setGameDeck([...deck])
    setPlayerHand([])
    setDealerHand([])
    setPlayerHandTotal(0)
    setDealerHandTotal(0)
    setPlayerBet(0)
  }

  const declareWinner = (isWinner, statusMessage) => {
    // Set game over state
    setIsWinner(isWinner)
    setStatusMessage(statusMessage)
    setIsGameOver(true)
  }

  const changePlayerView = () => {
    let viewTotals = !playerViewTotals
    console.log('change view', viewTotals)

    setPlayerViewTotals(viewTotals)

    if (viewTotals === true) viewTotals = 'true'
    if (viewTotals === false) viewTotals = 'false'
    localStorage.setItem('playerViewTotals', viewTotals)
  }

  /**
   * useEffect for initial load
   */
  useEffect(() => {
    // Get player bank from local storage and set state
    let playerBank = localStorage.getItem('playerBank') ?? initialPlayerBank
    playerBank = parseInt(playerBank)
    setPlayerBank(playerBank)

    // Get player wins and losses from local storage and set state
    let playerWins = localStorage.getItem('playerWins') ?? 0
    let playerLosses = localStorage.getItem('playerLosses') ?? 0
    setPlayerWins(playerWins)
    setPlayerLosses(playerLosses)

    // Get player view preference from local storage and set state
    let playerViewTotals = localStorage.getItem('playerViewTotals') ?? false
    if (playerViewTotals === 'true') playerViewTotals = true
    if (playerViewTotals === 'false') playerViewTotals = false
    setPlayerViewTotals(playerViewTotals)
  }, [])

  /**
   * useEffect for determining if the game is over and who won
   */
  useEffect(() => {
    if (playerHandTotal && dealerHandTotal) {
      // Check for automatic game ending conditions
      if (playerHandTotal === 21 && playerHand.length === 2) {
        declareWinner(true, 'PLAYER BLACKJACK!')
      } else if (playerHandTotal > 21) {
        declareWinner(false, 'PLAYER BUST!')
      }

      // Check for manual game ending conditions when player stays
      if (isPlayerFinished) {
        if (playerHandTotal <= 21 && playerHandTotal === dealerHandTotal) {
          declareWinner(null, 'TIE GAME!')
        } else if (dealerHandTotal === 21 && dealerHand.length === 2) {
          declareWinner(false, 'DEALER BLACKJACK!')
        } else if (dealerHandTotal > 21) {
          declareWinner(true, 'DEALER BUST!')
        } else if (playerHandTotal <= 21 && playerHandTotal > dealerHandTotal) {
          declareWinner(true, 'PLAYER WINS!')
        } else if (dealerHandTotal <= 21 && dealerHandTotal > playerHandTotal) {
          declareWinner(false, 'DEALER WINS!')
        }
      }
    }
  }, [
    playerHand,
    playerHandTotal,
    dealerHand,
    dealerHandTotal,
    isPlayerFinished
  ])

  /**
   * useEffect for saving player wins and losses to localStorage
   */
  useEffect(() => {
    if (isGameOver) {
      // Get playerWins and playerLosses from localStorage
      let playerWins = localStorage.getItem('playerWins') ?? 0
      let playerLosses = localStorage.getItem('playerLosses') ?? 0

      // Get player bank from local storage
      let playerBank = localStorage.getItem('playerBank') ?? initialPlayerBank

      // If isWinner is null, then it's a tie game so don't update wins or losses or bank
      if (isWinner !== null) {
        // If player wins...
        if (isWinner) {
          // Increment playerWins
          playerWins = parseInt(playerWins) + 1
          localStorage.setItem('playerWins', playerWins)

          // Add playerBet to playerBank
          playerBank = parseInt(playerBank) + parseInt(playerBet)
          localStorage.setItem('playerBank', playerBank)
        } else {
          // Increment playerLosses
          playerLosses = parseInt(playerLosses) + 1
          localStorage.setItem('playerLosses', playerLosses)

          // Subtract playerBet from playerBank
          playerBank = parseInt(playerBank) - parseInt(playerBet)
          localStorage.setItem('playerBank', playerBank)
        }

        // Set state
        setPlayerWins(playerWins)
        setPlayerLosses(playerLosses)
        setPlayerBank(playerBank)
      }
    }
  }, [isWinner, isGameOver, playerBet])

  return (
    <>
      <div className='min-h-screen bg-green-900 flex justify-center dark:bg-gray-900'>
        <div className='w-full md:w-1/2 p-4 h-full'>
          <div className='w-full flex items-center justify-end gap-2 mb-2'>
            <ThemeSwitcher />
            <ViewSwitcher
              playerViewTotals={playerViewTotals}
              changePlayerView={changePlayerView}
            />
          </div>
          {!isGameStarted && (
            <Welcome
              deal={shuffleAndDeal}
              playerBank={playerBank}
              playerBet={playerBet}
              placeBet={placeBet}
            />
          )}
          {isGameStarted && (
            <Table
              playerHand={playerHand}
              dealerHand={dealerHand}
              playerHandTotal={playerHandTotal}
              dealerHandTotal={dealerHandTotal}
              dealCardsToDealer={dealCardsToDealer}
              dealCardToPlayer={dealCardToPlayer}
              endGame={endGame}
              isWinner={isWinner}
              statusMessage={statusMessage}
              isGameOver={isGameOver}
              playerWins={playerWins}
              playerLosses={playerLosses}
              playerBet={playerBet}
              playerBank={playerBank}
              playerViewTotals={playerViewTotals}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App
