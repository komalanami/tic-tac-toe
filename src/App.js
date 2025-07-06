import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gametTurns) {
  let currentPlayer = 'X';

  if (gametTurns.length > 0 && gametTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

}

function App() {
  const [gametTurns, setGameTurns] = useState([])
  // const [hasWinner , setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = derivedActivePlayer(gametTurns);

  let gameBoard = initialGameBoard.map(row => [...row]);

  for (const turn of gametTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquaresSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquaresSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquaresSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquaresSymbol &&
      firstSquaresSymbol === secondSquaresSymbol &&
      firstSquaresSymbol === thirdSquaresSymbol
    ) {
      winner = firstSquaresSymbol;
    }

  }

  const hasDraw = gametTurns.length === 9 && !winner;

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
        {(winner || hasDraw) && < GameOver winner={winner} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </div>
      <Log turns={gametTurns} />
    </main>
  );
}

export default App;
