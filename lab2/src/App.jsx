import React from 'react';
import './App.css';
import GameAdmin from './components/gameadmin';
import Player from './components/player';
import { useEffect, useState } from "react";

function App() {

  const[user, setUser] = useState({
    name: "Ala",
    played: 0
  });
  const[user1, setUser1] = useState({
    name: "Tomek",
    played: 0
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
{}
  return (
    <div className="App">
      <Player name={user.name} turn={activePlayer == 1} played={user.played} click={onPlayButtonClick}/>
      <Player name={user1.name} turn={activePlayer == 2} played={user1.played} click={onPlayButtonClick1}/>
      <GameAdmin onChangeHandler={onChangeHandler} name={user.name}/>
      <GameAdmin onChangeHandler={onChangeHandler1} name={user1.name}/>

      <br/>
      

      <br/>
    </div>
    
  );
}

export default App;
