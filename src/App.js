import React, { useState } from 'react'

import Game from './components/Game';
import Start from './components/Start';

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  const startGame = () => {
    setIsPlaying(true);
  }

  const endGame = () => {
    setIsPlaying(false);
  }

  return (
    <>
      <Start isPlaying={isPlaying} startGame={startGame} />
      <Game isPlaying={isPlaying} endGame={endGame} />
    </>
  );
}

export default App;
