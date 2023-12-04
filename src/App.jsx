import { useEffect, useRef, useState } from "react";
import "./App.css";
import { GameBoard, GamePiece } from "./Game";
import x_bg from "./assets/x.svg";
import o_bg from "./assets/o.svg";

const initialBoardState = () => {
  return Array(9).fill({
    player: null,
  });
};

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
  const bg = useRef({
    x: x_bg,
    o: o_bg,
  });

  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [catGames, setCatGames] = useState(0);

  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [boardState, setBoardState] = useState(initialBoardState());

  const setPiece = (idx, player) => {
    if (player === null) {
      return;
    }

    if (currentPlayer === "game_over") {
      setBoardState(initialBoardState);
      setCurrentPlayer("x");
      return;
    }

    if (boardState[idx].player !== null) {
      return;
    }

    setBoardState(
      boardState.toSpliced(idx, 1, {
        player: player,
      })
    );
    setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
  };

  useEffect(() => {
    if (currentPlayer === "game_over") {
      return;
    }

    for (let line of lines) {
      if (line.every((cell) => boardState[cell].player === "x")) {
        setXWins(xWins + 1);
        setCurrentPlayer("game_over");
        return;
      } else if (line.every((cell) => boardState[cell].player === "o")) {
        setOWins(oWins + 1);
        setCurrentPlayer("game_over");
        return;
      }
    }

    if (boardState.every((cell) => cell.player !== null)) {
      setCurrentPlayer("game_over");
      setCatGames(catGames + 1);
    }
  }, [currentPlayer]);

  return (
    <>
      <h1>
        X: <code>{xWins}</code> — O: <code>{oWins}</code> — Cat:{" "}
        <code>{catGames}</code>
      </h1>
      <GameBoard>
        {boardState.map((piece, idx) => (
          <GamePiece
            piece={piece}
            key={idx}
            bg={bg.current[piece.player]}
            onClick={() => setPiece(idx, currentPlayer)}
          />
        ))}
      </GameBoard>
    </>
  );
}

export default App;
