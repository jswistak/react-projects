import { createSlice } from '@reduxjs/toolkit';

const initialState = [{x: 0, y: 0},{x: 0, y: 0}];

export const snakeSlice = createSlice({
    name: 'snake',
    initialState,
    reducers: {
        moveSnakeHead: (state, action) => {
            
            for (let i = state.length - 1; i > 0; i--) {    
                state[i] = state[i - 1];
            }
            if(action.payload.direction === 'down' && state[0].y < 19) {
                state[0].y += 1;
            }
            if(action.payload.direction === 'up' && state[0].y > 0) {
                state[0].y -= 1;
            }
            if(action.payload.direction === 'left' && state[0].x > 0) {
                state[0].x -= 1;
            }
            if(action.payload.direction === 'right' && state[0].x < 19) {
                state[0].x += 1;
            }
        },
        addElement: (state) => {
            state.push(state[state.length - 1]);
        }
    }
});

export const { moveSnakeHead, addElement } = snakeSlice.actions;

export default snakeSlice.reducer;