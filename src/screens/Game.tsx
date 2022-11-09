import * as React from 'react';
import { useDispatch } from 'react-redux';

import { ThemePreview } from '../components';
import { toggleTheme } from '../redux/theme/actions';

export default function GameScreen() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <ThemePreview />
      <button onClick={handleClick}>Toggle Theme</button>
    </div>
  );
}
