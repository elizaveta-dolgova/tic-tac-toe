type GameState = {
  squares: (number | string)[];
  actions: (number | string)[][];
  xTurn: boolean;
  isTie: boolean;
  winner: string;
};

type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  payload?: { [key: string]: any } | string | number;
  payload?: any;
};

const gameInitialState: GameState = {
  squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  actions: [[0, 1, 2, 3, 4, 5, 6, 7, 8]],
  xTurn: true,
  isTie: false,
  winner: '',
};

const board = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gameReducers = (state = gameInitialState, action: Action): GameState => {
  switch (action.type) {
    case 'btnClick': {
      if (typeof action.payload !== 'number') {
        return state;
      }
      const index = action.payload;
      const symbol = state.xTurn ? 'X' : 'O';
      return {
        ...state,
        squares: [...state.squares.slice(0, index), symbol, ...state.squares.slice(index + 1)],
        actions: [...state.actions, state.squares],
      };
    }

    case 'getWinner':
      for (let i = 0; i < board.length; i++) {
        const [a, b, c] = board[i];
        if (state.squares[a] === state.squares[b] && state.squares[a] === state.squares[c]) {
          return { ...state, winner: state.squares[a] as string };
        }
      }
      return state;

    case 'setWinner':
      if (action.payload.winner) {
        return { ...state, winner: action.payload.winner };
      } else if (action.payload.isTie) {
        return { ...state, isTie: true };
      }
      return state;

    case 'fetchGameResult':
      return state;

    case 'getTie':
      if (state.squares.every((item) => typeof item === 'string')) {
        return { ...state, isTie: true };
      }
      return state;

    case 'isXTurn':
      return { ...state, xTurn: !state.xTurn };

    case 'reset':
      return gameInitialState;

    case 'goBack':
      return {
        ...state,
        actions: [...state.actions.slice(0, state.actions.length - 1)],
        squares: state.actions[state.actions.length - 1],
        xTurn: !state.xTurn,
      };

    default:
      return state;
  }
};

export default gameReducers;
