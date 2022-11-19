import { configureStore } from '@reduxjs/toolkit';
import snakeHeadReducer from '../features/snake/snakeHead';

export const store = configureStore({
    reducer: {
        snake: snakeHeadReducer
    }
})