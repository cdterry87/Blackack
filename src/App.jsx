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
  const [isWinner, setIsWinner] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [playerHand, setPlayerHand] = useState([])
  const [playerHandTotal, setPlayerHandTotal] = useState(0)
  const [dealerHand, setDealerHand] = useState([])
  const [dealerHandTotal, setDealerHandTotal] = useState(0)
  const [gameDeck, setGameDeck] = useState([...deck])

  const shuffleAndDeal = () => {
    let tempGameDeck = [...gameDeck]
    let tempPlayerHand = []
    let tempDealerHand = []

    // Start the game
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
    return hand.reduce((total, card) => {
      if (card.value === 'A') {
        return total > 10 ? total + 1 : total + 11
      } else if (
        card.value === 'J' ||
        card.value === 'Q' ||
        card.value === 'K'
      ) {
        return total + 10
      } else {
        return total + parseInt(card.value)
      }
    }, 0)
  }

  const endGame = () => {
    setIsGameStarted(false)
    setIsPlayerFinished(false)
    setIsGameOver(false)
    setIsWinner(false)
    setStatusMessage('')
    setGameDeck([...deck])
    setPlayerHand([])
    setDealerHand([])
    setPlayerHandTotal(0)
    setDealerHandTotal(0)
  }

  useEffect(() => {
    if (playerHandTotal && dealerHandTotal) {
      // Check for automatic game ending conditions
      if (playerHandTotal === 21 && playerHand.length === 2) {
        // Player blackjack
        setIsWinner(true)
        setIsGameOver(true)
        setStatusMessage('PLAYER BLACKJACK!')
      } else if (playerHandTotal > 21) {
        // Player bust
        setIsWinner(false)
        setIsGameOver(true)
        setStatusMessage('PLAYER BUST!')
      } else if (dealerHandTotal === 21 && dealerHand.length === 2) {
        // Dealer blackjack
        setIsWinner(false)
        setIsGameOver(true)
        setStatusMessage('DEALER BLACKJACK!')
      }

      // Check for manual game ending conditions when player stays
      if (isPlayerFinished) {
        if (playerHandTotal <= 21 && playerHandTotal === dealerHandTotal) {
          // Tie game
          setIsWinner(false)
          setIsGameOver(true)
          setStatusMessage('TIE GAME!')
        } else if (dealerHandTotal > 21) {
          // Dealer bust
          setIsWinner(true)
          setIsGameOver(true)
          setStatusMessage('DEALER BUST!')
        } else if (playerHandTotal <= 21 && playerHandTotal > dealerHandTotal) {
          // Player wins
          setIsWinner(true)
          setIsGameOver(true)
          setStatusMessage('PLAYER WINS!')
        } else if (dealerHandTotal <= 21 && dealerHandTotal > playerHandTotal) {
          // Dealer wins
          setIsWinner(false)
          setIsGameOver(true)
          setStatusMessage('DEALER WINS!')
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
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App
