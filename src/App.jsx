import React, { useState } from 'react'

import Table from './components/Table'
import Start from './components/Start'
import deck from './data/deck.json'

import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  AOS.init()

  const [isPlaying, setIsPlaying] = useState(false)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [gameDeck, setGameDeck] = useState([])

  let tempGameDeck = [...deck]

  const shuffle = () => {
    for (let i = 0; i < tempGameDeck.length - 1; i++) {
      let j = i + Math.floor(Math.random() * (tempGameDeck.length - i))
      let temp = tempGameDeck[j]
      tempGameDeck[j] = tempGameDeck[i]
      tempGameDeck[i] = temp
    }

    console.log('shuffled tempGameDeck', tempGameDeck)
  }

  const dealCardToPlayer = () => {
    // Draw a random card from the game deck
    let draw = Math.floor(Math.random() * tempGameDeck.length)

    console.log('deal card to player', tempGameDeck[draw])

    // Add the card to the player's hand
    setPlayerHand(playerHand => [...playerHand, tempGameDeck[draw]])

    // Remove the card from the game deck
    tempGameDeck = [...tempGameDeck.filter((card, index) => index !== draw)]
  }

  const dealCardToDealer = () => {
    // Draw a random card from the game deck
    let draw = Math.floor(Math.random() * tempGameDeck.length)

    console.log('deal card to dealer', tempGameDeck[draw])

    // Add the card to the dealer's hand
    setDealerHand(dealerHand => [...dealerHand, tempGameDeck[draw]])

    // Remove the card from the game deck
    tempGameDeck = [...tempGameDeck.filter((card, index) => index !== draw)]
  }

  const startGame = () => {
    console.log('startGame')
    setIsPlaying(true)
    shuffle()
    dealCardToPlayer()
    dealCardToDealer()
    dealCardToPlayer()
    dealCardToDealer()

    setGameDeck(tempGameDeck)
  }

  const resetGame = () => {
    console.log('resetGame', deck)
    tempGameDeck = [...deck]
    setPlayerHand([])
    setDealerHand([])

    setGameDeck(tempGameDeck)
  }

  const endGame = () => {
    console.log('endGame')
    resetGame()
    setIsPlaying(false)
  }

  return (
    <>
      <Start isPlaying={isPlaying} startGame={startGame} />
      <Table
        isPlaying={isPlaying}
        dealCardToDealer={dealCardToDealer}
        dealCardToPlayer={dealCardToPlayer}
        gameDeck={gameDeck}
        playerHand={playerHand}
        dealerHand={dealerHand}
        endGame={endGame}
      />
    </>
  )
}

export default App
