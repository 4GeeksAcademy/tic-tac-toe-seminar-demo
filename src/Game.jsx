import "./Game.css";

const GamePiece = ({ piece, bg, color, onClick }) => {
  return (
    <div
      className={`game-piece ${piece.player}`}
      style={{
        backgroundImage: `url(${bg})`,
      }}
      onClick={onClick}
    ></div>
  );
};

const GameBoard = ({ children }) => {
  return (
    <>
      <div className="game-board">{children}</div>
    </>
  );
};

export { GameBoard, GamePiece };
