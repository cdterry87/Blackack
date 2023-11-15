import { useState, useEffect } from 'react'

import Table from 'components/Table'
import Welcome from 'components/Welcome'
import GameOver from 'components/GameOver'
import deck from 'data/deck.json'

import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  AOS.init() // Initialize Animations

  /**
   * TODO: The GameOver component shouldn't replace the table component.
   * Right now when GameOver pops up it hides all the cards on the table
   * but it would be nice to see everything, including the dealer's cards.
   */

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

  const dealCardToDealer = () => {
    let tempGameDeck = [...gameDeck]
    let tempDealerHand = [...dealerHand]

    // Add the first card to dealer's hand
    tempDealerHand.push(tempGameDeck[0])

    // Calculate the dealer's hand total
    let tempHandTotal = calculateHandTotal(tempDealerHand)

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
      // Check for blackjack
      if (playerHandTotal === 21 && playerHand.length === 2) {
        // Player blackjack
        setIsWinner(true)
        setIsGameOver(true)
        setStatusMessage('Blackjack! You win!')
      } else if (playerHandTotal > 21) {
        // Player bust
        setIsWinner(false)
        setIsGameOver(true)
        setStatusMessage('Sorry, you bust!')
      }

      if (isPlayerFinished) {
        if (playerHandTotal <= 21 && playerHandTotal === dealerHandTotal) {
          // Tie game
          setIsWinner(false)
          setIsGameOver(true)
          setStatusMessage('Tie game!')
        } else if (dealerHandTotal === 21 && dealerHand.length === 2) {
          // Dealer blackjack
          setIsWinner(false)
          setIsGameOver(true)
          setStatusMessage('Dealer Blackjack! You lose!')
        } else if (dealerHandTotal > 21) {
          // Dealer bust
          setIsWinner(true)
          setIsGameOver(true)
          setStatusMessage('Dealer bust! You win!')
        } else if (playerHandTotal === 21) {
          // Player wins
          setIsWinner(true)
          setIsGameOver(true)
          setStatusMessage('You win!')
        } else if (dealerHandTotal <= 21 && dealerHandTotal > playerHandTotal) {
          // Dealer wins
          setIsWinner(false)
          setIsGameOver(true)
          setStatusMessage('Sorry, you lost!')
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
          {!isGameStarted && !isGameOver && <Welcome deal={shuffleAndDeal} />}
          {isGameStarted && !isGameOver && (
            <Table
              playerHand={playerHand}
              dealerHand={dealerHand}
              playerHandTotal={playerHandTotal}
              dealerHandTotal={dealerHandTotal}
              dealCardToDealer={dealCardToDealer}
              dealCardToPlayer={dealCardToPlayer}
              setIsPlayerFinished={setIsPlayerFinished}
              endGame={endGame}
            />
          )}
          {isGameOver && (
            <GameOver
              isWinner={isWinner}
              statusMessage={statusMessage}
              endGame={endGame}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App
