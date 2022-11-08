import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Square from './Square';
import { RootState} from './store/store';

function App() {
  let online = false;
  const { actions, squares, winner, isTie} = useSelector((state: RootState ) => state);

  const dispatch = useDispatch();

  const btnHandler = (index: number) => {
    dispatch({type: 'btnClick', payload: index});
    dispatch({type: 'isXTurn'});
    dispatch({type: 'getWinner'});
    dispatch({type: 'getTie'});
  }

  const historyBtnHandler = (index: number) => {
    dispatch({type: 'historyBtnClick', payload: index})
  }

  const getClassName = (index: number) => {
    if (squares[index] === 'X') {
      return 'X';
    }
    else if (squares[index] === 'O') {
      return 'O';
    }
    return '';
  }

  const resetBtnHandler = () => {
    dispatch({type: 'reset'});
  }

  const goBackBtnHandler = () => {
    dispatch({type: 'goBack'})
  }

  return (
    <>
      <div className='board'>
      {squares.map((item, index) => 
        <Square
          disabled={typeof item === 'string'} 
          key={index}
          text={typeof item === 'string' ? item : ''}
          onClick={() => {btnHandler(index)}}
          className={`square ${getClassName(index)}`}
        />)}
      </div>
      {winner && 
        <div className='gameOverModal'>
          <p className='gameOverModal__text'>{`${winner} win`}</p>
        </div>
      }
      {isTie && 
        <div className='gameOverModal'>
          <p className='gameOverModal__text'>TIE</p>
      </div>
      }
      {/* <button>{online ? 'online' : 'ofline'}</button> */}
      <button onClick={goBackBtnHandler} disabled={actions.length === 1}>Go Back</button>
      <div className='moveBtn-container'>
        {/* {actions.map((item, index) => 
          <button onClick={() => {historyBtnHandler(index)}} key={index}>{index ? 'Go to move #' + index : 'Go to game start'}
          </button>
        )} */}
      </div>
      <button className='resetBtn' onClick={resetBtnHandler}>new game</button>
    </>
  );
}

export default App;
