import { useState, useEffect } from 'react'

import Table from 'components/Table'
import Welcome from 'components/Welcome'
import deck from 'data/deck.json'

import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  AOS.init() // Initialize Animations

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

  const shuffleAndDeal = () => {
    let tempGameDeck = [...gameDeck]
    let tempPlayerHand = []
    let tempDealerHand = []

    // Get player wins and losses from local storage
    let playerWins = localStorage.getItem('playerWins')
    let playerLosses = localStorage.getItem('playerLosses')

    // Start the game and set wins and losses
    setIsGameStarted(true)
    setPlayerWins(playerWins)
    setPlayerLosses(playerLosses)

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
    // Calculate the hand total without aces
    let handTotal = hand.reduce((total, card) => {
      if (card.value === 'A') {
        return total + 0
      } else if (
        card.value === 'J' ||
        card.value === 'Q' ||
        card.value === 'K'
      ) {
        return total + 10
      }
      return total + parseInt(card.value)
    }, 0)

    // Calculate the hand total with aces
    hand.forEach(card => {
      if (card.value === 'A') {
        if (handTotal + 11 <= 21) {
          handTotal += 11
        } else {
          handTotal += 1
        }
      }
    })

    return handTotal
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
  }

  const declareWinner = (isWinner, statusMessage) => {
    // Set game over state
    setIsWinner(isWinner)
    setStatusMessage(statusMessage)
    setIsGameOver(true)
  }

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
          declareWinner(false, 'TIE GAME!')
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

      // Increment playerWins or playerLosses depending on if the player won or lost and save in localStorage
      if (isWinner) {
        playerWins = parseInt(playerWins) + 1
        localStorage.setItem('playerWins', playerWins)
      } else {
        playerLosses = parseInt(playerLosses) + 1
        localStorage.setItem('playerLosses', playerLosses)
      }

      // Set state
      setPlayerWins(playerWins)
      setPlayerLosses(playerLosses)
    }
  }, [isWinner, isGameOver])

  return (
    <>
      <div className='min-h-screen bg-green-900 flex items-center justify-center'>
        <div className='w-full sm:w-auto p-4 h-full'>
          {!isGameStarted && <Welcome deal={shuffleAndDeal} />}
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
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App
