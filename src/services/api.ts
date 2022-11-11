import { GameResult } from "../redux/game/actions";

type Result = [GameResult | undefined, any | undefined];

export const fetchGameResult = async (squares: (number | string)[]): Promise<Result> => {
  try {
    const response = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        gameState: squares,
      }),
    });
    const gameResult = await response.json();

    return [gameResult, undefined];
  } catch(err) {
    return [undefined, err];
  }
};
