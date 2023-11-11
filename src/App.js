import React, { useState } from 'react'

import Board from './components/Board';
import Start from './components/Start';

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  const startGame = () => {
    setIsPlaying(true);
  }

  return (
    <>
      <Start isPlaying={isPlaying} onClick={startGame} />
      <Board isPlaying={isPlaying} />
    </>
  );
}

export default App;
