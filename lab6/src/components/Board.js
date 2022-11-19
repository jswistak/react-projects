import React from 'react';
import { useEffect, useCallback } from "react";
import BoardElement from './BoardElement';
import { useSelector, useDispatch } from "react-redux"
import { moveSnakeHead, addElement} from "../features/snake/snakeHead"

const Board = () => {
    const snake = useSelector((state) => state.snake);
    const dispatch = useDispatch();
    //console.log(snake)
    const isSnake = (x, y) => {
        //console.log(snake.some(element => element.x === x && element.y === y));
        return snake.some(element => element.x === x && element.y === y);
        
    }
    const handleKeyDown = useCallback((event) => {
        switch (event.key) {
          case 'ArrowRight':
            dispatch(moveSnakeHead({direction: 'right'}));
            break;
          case 'ArrowLeft':
            dispatch(moveSnakeHead({direction: 'left'}));
            break;
          case 'ArrowDown':
            dispatch(moveSnakeHead({direction: 'down'}));
            break;
          case 'ArrowUp':
            dispatch(moveSnakeHead({direction: 'up'}));
            break;
        };
    }, [dispatch]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleKeyDown]);
    return (
        <div style={{
            width: "400px",
            margin: "auto",
            
        }}>
            {Array(20).fill(0).map((_, y) => <div className='row' key={y}>
                {Array(20).fill(0).map((_, x) => <BoardElement key={x} value={isSnake(x,y)}/>)}
            </div>)}
            
            <br/><br/>
            <button onClick={() => dispatch(addElement())}>Add</button>

            <button onClick={() => dispatch(moveSnakeHead({direction: 'up'}))}>Move Up</button>
            <button onClick={() => dispatch(moveSnakeHead({direction: 'down'}))}>Move Down</button>
            <button onClick={() => dispatch(moveSnakeHead({direction: 'left'}))}>Move Left</button>
            <button onClick={() => dispatch(moveSnakeHead({direction: 'right'}))}>Move Right</button>

        </div>

    );

}

export default Board;