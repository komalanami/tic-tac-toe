import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: 'Player1',
  O: 'Player2'
}

const INTIAL_GAME_BOARD = [
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

function derivedWinner(gameBoard, players) {
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
      winner = players[firstSquaresSymbol];
    }

    return winner;

  }
}

function deriveGameBoard(gametTurns) {
  let gameBoard = [...INTIAL_GAME_BOARD.map(row => [...row])];

  for (const turn of gametTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gametTurns, setGameTurns] = useState([])

  const activePlayer = derivedActivePlayer(gametTurns);
  const gameBoard = deriveGameBoard(gametTurns);
  const winner = derivedWinner(gameBoard, players);

  const hasDraw = gametTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && < GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </div>
      <Log turns={gametTurns} />
    </main>
  );
}

export default App
