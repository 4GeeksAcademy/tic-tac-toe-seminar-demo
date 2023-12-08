import { useEffect, useRef, useState } from 'react';
import './App.css';

import { GamePiece } from './GamePiece';

import x_svg from "./assets/x.svg";
import o_svg from "./assets/o.svg";

const backgrounds = {
  x:  {backgroundImage: `url(${x_svg})`},
  o:  {backgroundImage: `url(${o_svg})`},
}

const lines = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Diagonals
  [0, 4, 8],
  [6, 4, 2],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function App() {
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [ties, setTies] = useState(0);

  const isDone = useRef(false);
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [gameState, setGameState] = useState([
    null, null, null,
    null, null, null,
    null, null, null,
  ]);

  const dehydrate = () => {
    sessionStorage.setItem("gameState", JSON.stringify(gameState));
    sessionStorage.setItem("xWins", xWins);
    sessionStorage.setItem("oWins", oWins);
    sessionStorage.setItem("ties", ties);
  }

  const handleClick = (idx) => {
    if (isDone.current) {
      setGameState([
        null, null, null,
        null, null, null,
        null, null, null,
      ]);
      isDone.current = false;
      return;
    }
    
    if (gameState[idx] !== null) {
      return;
    }

    setGameState(gameState.toSpliced(idx, 1, currentPlayer));
    setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
  }

  useEffect(() => {
    setGameState(JSON.parse(
      sessionStorage.getItem("gameState")
    ) || new Array(9).fill(null));
    setXWins(JSON.parse(
      sessionStorage.getItem("xWins")
    ) || 0);
    setOWins(JSON.parse(
      sessionStorage.getItem("oWins")
    ) || 0);
    setTies(JSON.parse(
      sessionStorage.getItem("ties")
    ) || 0);
  }, [])

  // Check to see if someone won the game!
  // (or if the game is a tie.)
  useEffect(() => {
    for (let line of lines) {
      if (line.every(idx => gameState[idx] === "x")) {
        isDone.current = true;
        setXWins(xWins + 1);
        dehydrate();
        return;
      } else if (line.every(idx => gameState[idx] === "o")) {
        isDone.current = true;
        setOWins(oWins + 1);
        dehydrate();
        return;
      }
    }

    if (gameState.every(cell => cell !== null)) {
      isDone.current = true;
      setTies(ties + 1);
      dehydrate();
    }
  }, [gameState]);

  return (
    <>
      <div className="container d-flex flex-column align-items-center">
      <h1>X wins: <code>{xWins}</code> |
          O wins: <code>{oWins}</code> |
          Ties:   <code>{ties}</code>
      </h1>
        <div className="game-board">
          {gameState.map((player, idx) => <GamePiece
            key={idx}
            player={player}
            style={backgrounds[player]}
            onClick={() => handleClick(idx)}
          />)}
        </div>
      </div>
    </>
  )
}

export default App
