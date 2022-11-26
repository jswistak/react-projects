import React from 'react';
import { useEffect, useState } from "react";
import { stadiumState, matchState } from '../data/atom';
import { useRecoilState, useRecoilValue } from 'recoil';


const Editor = (props) => {

    const [stadium, setStadium] = useRecoilState(stadiumState);
    const [match, setMatch] = useRecoilState(matchState);
    

    return (
        <div style={{background:"green"}} >
        <h3>Enter country codes:</h3>
        <p>First team country code:</p>
        <input type="text" value={match.codeFirst} onChange={(e) => setMatch({...match, codeFirst: e.target.value, scoreFirst: 0, scoreSecond: 0 })} />


        <p>Second team country code:</p>
        <input type="text" value={match.codeSecond} onChange={(e) => setMatch({...match, codeSecond: e.target.value, scoreFirst: 0, scoreSecond: 0 })} />


        <p>Enter the stadium:</p>
        <input type="text" value={match.stadium} onChange={(e) => setMatch({...match, stadium: e.target.value, scoreFirst: 0, scoreSecond: 0 })} />


        <button onClick={(e) => setMatch({...match, scoreFirst:  match.scoreFirst + 1})}>Goal for first team</button>


        <button onClick={(e) => setMatch({...match, scoreSecond:  match.scoreSecond + 1})}>Goal for second team</button>
        </div>

    );

}

export default Editor;