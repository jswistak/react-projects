import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  function getCurrentTime(result:string, seconds:number, shouldFail:boolean = false){
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        
        if(shouldFail){
          reject("Failed" + result);
        }
        else{
          console.log('getCurrentTime', result);
          resolve(result)
        }
        
      }, seconds * 1000);
    });
  }
  function getMyLocation(result:string, seconds:number){
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        console.log('getMyLocation', result);
        resolve(result)
      }, seconds * 1000);
    });
  }
  function getWeatherFromMeteo(){
    console.log("Weather Meteo");
    return Promise.all([
      getCurrentTime('Meteo: time', 2, true),
      getMyLocation('Meteo: location', 3),
    ]);
  }
  function getWeatherFromOnet(){
    console.log("Weather Onet");
    return Promise.all([
      getCurrentTime('Onet: time', 2),
      getMyLocation('Onet: location', 3),
    ]);
  }
  function getWeatherFromGoogle(){
    console.log("Weather Google");
    return Promise.all([
      getCurrentTime('Google: time', 5),
      getMyLocation('Google: location', 3),
    ]);
  }
  
  const canIGoOutNow = () => {
    Promise.race([getWeatherFromGoogle(), getWeatherFromMeteo(), getWeatherFromOnet()]).then((result) =>{
      setMessage(result.join('\n'));
    }).catch((errorMsg) =>{
      setMessage(errorMsg);
      console.warn(errorMsg)
    })
    setIsThinking(true); 
    
  }
  return (
    <button onClick={canIGoOutNow}>Can I go out now</button>
  );
}

export default App;
