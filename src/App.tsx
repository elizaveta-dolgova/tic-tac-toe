import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles/App.css';
import Square from './components/Square';
import { getCurrentGameState } from './redux/game/selectors';
import { changeSquare, fetchGameResult, goBack, isXTurn, makeMove, resetGame } from './redux/game/actions';

function App() {
  const { actions, squares, winner, isTie } = useSelector(getCurrentGameState);
  const dispatch = useDispatch();

  const btnHandler = (index: number) => {
    dispatch(makeMove(index));
    // dispatch(changeSquare(index));
    // dispatch(isXTurn());
    // dispatch(fetchGameResult());
  };

  const getClassName = (index: number) => {
    if (squares[index] === 'X') {
      return 'X';
    } else if (squares[index] === 'O') {
      return 'O';
    }
    return '';
  };

  const resetBtnHandler = () => {
    dispatch(resetGame());
  };

  const goBackBtnHandler = () => {
    dispatch(goBack());
  };

  return (
    <>
      <div className="board">
        {squares.map((item, index) => (
          <Square
            disabled={typeof item === 'string'}
            key={index}
            text={typeof item === 'string' ? item : ''}
            onClick={() => {
              btnHandler(index);
            }}
            className={`square ${getClassName(index)}`}
          />
        ))}
      </div>
      {winner && (
        <div className="gameOverModal">
          <p className="gameOverModal__text">{`${winner} win`}</p>
        </div>
      )}
      {isTie && (
        <div className="gameOverModal">
          <p className="gameOverModal__text">TIE</p>
        </div>
      )}
      <button onClick={goBackBtnHandler} disabled={actions.length === 1}>
        Go Back
      </button>
      <div className="moveBtn-container"></div>
      <button className="resetBtn" onClick={resetBtnHandler}>
        new game
      </button>
    </>
  );
}

export default App;
