import { useState } from 'react'

import Table from 'components/Table'
import Welcome from 'components/Welcome'
import GameOver from 'components/GameOver'
import deck from 'data/deck.json'

import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  AOS.init() // Initialize Animations

  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [gameDeck, setGameDeck] = useState([...deck])

  const shuffleAndDeal = () => {
    let tempGameDeck = [...gameDeck]
    let tempPlayerHand = []
    let tempDealerHand = []

    // Start the game
    setIsPlaying(true)

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

    // Set the state
    setGameDeck(tempGameDeck)
    setPlayerHand(tempPlayerHand)
    setDealerHand(tempDealerHand)
  }

  const dealCardToPlayer = () => {
    let tempGameDeck = [...gameDeck]

    // Add the first card to player's hand and then remove it from the deck
    setPlayerHand(playerHand => [...playerHand, tempGameDeck[0]])

    // Set the state
    setGameDeck(gameDeck => [...gameDeck.filter((card, index) => index !== 0)])
  }

  const dealCardToDealer = () => {
    let tempGameDeck = [...gameDeck]

    // Add the first card to dealer's hand and then remove it from the deck
    setDealerHand(dealerHand => [...dealerHand, tempGameDeck[0]])

    // Set the state
    setGameDeck(gameDeck => [...gameDeck.filter((card, index) => index !== 0)])
  }

  const determineWinner = () => {
    console.log('determine winner')
  }

  const endGame = () => {
    setIsPlaying(false)
    setIsGameOver(false)
    setIsWinner(false)
    setStatusMessage('')
    setGameDeck([...deck])
    setPlayerHand([])
    setDealerHand([])
  }

  return (
    <>
      <div className='min-h-screen bg-green-900 flex items-center justify-center'>
        <div className='w-full sm:w-auto p-4 h-full'>
          {!isPlaying && !isGameOver && <Welcome deal={shuffleAndDeal} />}
          {isPlaying && !isGameOver && (
            <Table
              dealCardToDealer={dealCardToDealer}
              dealCardToPlayer={dealCardToPlayer}
              playerHand={playerHand}
              dealerHand={dealerHand}
              determineWinner={determineWinner}
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
