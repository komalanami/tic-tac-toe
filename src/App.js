import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";

function derivedActivePlayer(gametTurns) {
  let currentPlayer = 'X';

  if (gametTurns.length > 0 && gametTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

}

function App() {
  const [gametTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = derivedActivePlayer(gametTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'} />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gametTurns} />
      </div>
      <Log turns={gametTurns} />
    </main>
  );
}

export default App;
