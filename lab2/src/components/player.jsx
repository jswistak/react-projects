import React, { useEffect, useState } from "react";


function Player(props){
    
    return (
        <div className="player">
        <h3>Player data</h3>
        <div>
            <label>Name: {props.name}</label><br/>
            <label>Played: {props.played}</label><br/>
            <button onClick={props.click} disabled={props.turn}>
                {props.turn? 'This user is playing now' : 'Play'}
            </button>
            
        </div>
        
        </div>
    );
    
}

export default Player;