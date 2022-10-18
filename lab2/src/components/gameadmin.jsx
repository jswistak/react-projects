import React from 'react';
import Player from './player';
import { useEffect, useState } from "react";


function GameAdmin(props){
    const[user, setUser] = useState({
        name: "Ala",
        played: "0"
      });
      const[user1, setUser1] = useState({
        name: "Tomek",
        played: "0"
      });
      const[activePlayer, setTurn] = useState(1);
      function onChangeHandler(e){
        setUser(prevUser =>({
            ...prevUser,
            name: e.target.value
        }))
        
        console.log("Name changed " + user.name);
      }
      function onPlayButtonClick(e){
        setUser(prevUser =>({
            ...prevUser,
            played: parseInt(prevUser.played) + 1
        }))
        setTurn(1);
        console.log("Button clicked");
      }
      function onChangeHandler1(e){
        setUser1(prevUser =>({
            ...prevUser,
            name: e.target.value
        }))
        
        console.log("Name1 changed " + user.name);
      }
      function onPlayButtonClick1(e){
        setUser1(prevUser =>({
            ...prevUser,
            played: parseInt(prevUser.played) + 1
        }))
        setTurn(2);
        console.log("Button clicked");
    }




    return (
        <div>
            <Player name={user.name} turn={activePlayer == 1} played={user.played} click={onPlayButtonClick}/>
            <Player name={user1.name} turn={activePlayer == 2} played={user1.played} click={onPlayButtonClick1}/>
            <div className="gameadmin1">
                <label>Name of the player:</label>
                <input type="text" id="pname" name="pname"
                onChange={onChangeHandler} value={user.name}/><br/>
            
            </div>
            <div className="gameadmin2">
                <label>Name of the player:</label>
                <input type="text" id="pname" name="pname"
                onChange={onChangeHandler1} value={user1.name}/><br/>
            
            </div>
        </div>
        
    );
    
}

export default GameAdmin;
