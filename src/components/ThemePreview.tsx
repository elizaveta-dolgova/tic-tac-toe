import * as React from 'react';
import { useSelector } from 'react-redux';

import { Theme } from '../redux/theme/reducer';
import { getCurrentTheme } from '../redux/theme/selectors';

export default function ThemePreview() {
  const theme = useSelector(getCurrentTheme);

  let themeClass = 'preview dark';
  if (theme === Theme.LIGHT) {
    themeClass = 'preview light';
  }

  return <div className={themeClass} />;
}
