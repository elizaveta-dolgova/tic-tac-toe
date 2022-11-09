import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Square from './Square';
import type { RootState } from './store/store';
import * as React from 'react';

function App() {
  const { actions, squares, winner, isTie } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const btnHandler = (index: number) => {
    dispatch({ type: 'btnClick', payload: index });
    dispatch({ type: 'isXTurn' });
    dispatch({ type: 'fetchGameResult' });
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
    dispatch({ type: 'reset' });
  };

  const goBackBtnHandler = () => {
    dispatch({ type: 'goBack' });
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
