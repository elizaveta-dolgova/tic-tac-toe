
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Square from './Square';
import { gameActions } from './store/gameSlice';

function App() {
  const online = false;
 // const { squares, winner, tie} = useSelector(state => state.game);
  
  const squares = useSelector(state => state.game.squares);
  const winner = useSelector(state => state.game.winner);
  const tie = useSelector(state => state.game.isTie);

  const dispatch = useDispatch();

  const btnHandler = (index) => {
    dispatch(gameActions.btnClick({ index }));
    dispatch(gameActions.isXTurn());
    dispatch(gameActions.getWinner());
    dispatch(gameActions.getTie());
  }

  const getClassName = (index) => {
    if (squares[index] === 'X') {
      return 'X';
    }
    else if (squares[index] === 'O') {
      return 'O';
    }
    return '';
  }

  const resetBtnHandler = () => {
    dispatch(gameActions.reset());
  }

  return (
    <>
      <div className='board'>
      {squares.map((item, index) => 
        <Square
          disabled={typeof item === 'string'} 
          key={index}
          text={item}
          onClick={() => {btnHandler(index)}}
          className={`square ${getClassName(index)}`}
        />)}
      </div>
      {winner && 
        <div className='gameOverModal'>
          <p className='gameOverModal__text'>{`${winner} win`}</p>
        </div>
      }
      {tie && 
        <div className='gameOverModal'>
          <p className='gameOverModal__text'>TIE</p>
      </div>
      }
      {/* <button>{online ? 'online' : 'ofline'}</button> */}
      <button className='resetBtn' onClick={resetBtnHandler}>new game</button>
    </>
  );
}

export default App;
