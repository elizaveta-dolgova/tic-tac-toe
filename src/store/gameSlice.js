import { createSlice } from "@reduxjs/toolkit";

const board = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const gameInitialState = {
    squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    xTurn: true,
    isTie: false,
    winner: '',
}

const gameSlice = createSlice({
    name: 'game',
    initialState: gameInitialState,

    reducers: {
        btnClick(state, action) {
            const { index } = action.payload;
            const symbol = state.xTurn ? 'X' : 'O';
            state.squares[index] = symbol;
        },

        getWinner(state) {
            for (const item of board) {
                if (state.squares[item[0]] === state.squares[item[1]] && state.squares[item[1]] === state.squares[item[2]]) {
                    state.winner = state.squares[item[0]];
                    break;
                }
                else {
                    state.winner = '';
                }
            }
        },

        getTie(state) {
            if (state.squares.every(item => typeof item === 'string')) {
                state.isTie = true;
            }
        },

        isXTurn(state) {
            state.xTurn = !state.xTurn;
        },

        reset(state) {
            return gameInitialState;
        }
    }
})

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;