import React, { useState } from 'react'

import Game from './components/Game'
import Start from './components/Start'
import deck from './services/deck'

import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  AOS.init()

  const [isPlaying, setIsPlaying] = useState(false)
  const [gameDeck, setGameDeck] = useState([...deck])
  const [dealerHand, setDealerHand] = useState([])
  const [playerHand, setPlayerHand] = useState([])

  const shuffle = () => {
    for (let i = 0; i < gameDeck.length - 1; i++) {
      let j = i + Math.floor(Math.random() * (gameDeck.length - i))
      let temp = gameDeck[j]
      gameDeck[j] = gameDeck[i]
      gameDeck[i] = temp
    }

    setGameDeck(gameDeck => [...gameDeck])
    console.log('shuffled gameDeck', gameDeck)
  }

  const dealCardToPlayer = () => {
    // Draw a random card from the game deck
    let draw = Math.floor(Math.random() * gameDeck.length)

    console.log('deal card to player', gameDeck[draw])

    // Add the card to the player's hand
    setPlayerHand(playerHand => [...playerHand, gameDeck[draw]])

    // Remove the card from the game deck
    setGameDeck(gameDeck => [
      ...gameDeck.filter((card, index) => index !== draw)
    ])
  }

  const dealCardToDealer = (isFaceDown = false) => {
    // Draw a random card from the game deck
    let draw = Math.floor(Math.random() * gameDeck.length)

    console.log('deal card to dealer', gameDeck[draw])

    // Set the card to be face down if it's the dealer's first card
    if (isFaceDown) {
      gameDeck[draw].isFaceDown = true
    }

    // Add the card to the dealer's hand
    setDealerHand(dealerHand => [...dealerHand, gameDeck[draw]])

    // Remove the card from the game deck
    setGameDeck(gameDeck => [
      ...gameDeck.filter((card, index) => index !== draw)
    ])
  }

  const startGame = () => {
    console.log('startGame')
    setIsPlaying(true)
    shuffle()
    dealCardToPlayer(false)
    console.log('gameDeck after deal', gameDeck)
    dealCardToDealer(true)
    console.log('gameDeck after deal', gameDeck)
    dealCardToPlayer(false)
    console.log('gameDeck after deal', gameDeck)
    dealCardToDealer(false)
    console.log('gameDeck after deal', gameDeck)
  }

  const resetGame = () => {
    console.log('resetGame', deck)
    setGameDeck([...deck])
    setPlayerHand([])
    setDealerHand([])
  }

  const endGame = () => {
    console.log('endGame')
    resetGame()
    setIsPlaying(false)
  }

  return (
    <>
      <Start isPlaying={isPlaying} startGame={startGame} />
      <Game
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
