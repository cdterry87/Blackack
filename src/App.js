import React, { useState } from 'react'

import Board from './components/Board';
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
      <Board isPlaying={isPlaying} endGame={endGame} />
    </>
  );
}

export default App;
