type GameState = {
    squares: (number | string)[];
    actions: (number | string)[][];
    xTurn: boolean;
    isTie: boolean;
    winner: string;
};

type Action = {
    type: string;
    payload: any;
};

const gameInitialState: GameState = {
    squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    actions: [[0, 1, 2, 3, 4, 5, 6, 7, 8], ],
    xTurn: true,
    isTie: false,
    winner: '',
}

const gameReducer = (state = gameInitialState, action: Action): GameState => {
    if (action.type === 'btnClick') {
        const index  = action.payload;
        const symbol = state.xTurn ? 'X' : 'O';
        return {...state, 
                squares: [...state.squares.slice(0, index), symbol, ...state.squares.slice(index + 1)],
                actions: [...state.actions, state.squares]    
            };
    }
    if (action.type === 'getWinner') {
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
            for (let i = 0; i < board.length; i++) {
              const [a, b, c] = board[i];
              if (state.squares[a] === state.squares[b] && state.squares[a] === state.squares[c]) {
                return {...state, winner: state.squares[a] as string};
              }
            }
            return state;
    }

    if (action.type === 'getTie') {
        if (state.squares.every(item => typeof item === 'string')) {
            return {...state, isTie: true}
        }
    }
    if (action.type === 'isXTurn') {
        return {...state, xTurn: !state.xTurn}
    }
    if (action.type === 'reset') {
        return gameInitialState;
    }
    if (action.type === 'goBack') {
        return {...state, 
            actions: [...state.actions.slice(0, state.actions.length - 1)],
            squares: state.actions[state.actions.length - 1]
        }
    }
    // if (action.type === 'historyBtnClick') {
    //     console.log(state.actions);
    //     const index = action.payload;
    //     console.log(index);
    //     console.log(state.actions[index])
    //     return {...state,
    //         squares: state.actions[index]
    //     }
    // }

    return state;
}

export default gameReducer;