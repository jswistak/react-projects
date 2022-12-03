import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { carsState } from '../data/atom'

const AboutPage = () => {

    //const [stadium, setStadium] = useRecoilState();
    //const [match, setMatch] = useRecoilState();
    const [cars, setCars] = useRecoilState(carsState)
    const navigate = useNavigate();

    return (
        <div>
            {cars.map(car => <div key={'car' + car.id}><a href={'/cars/'+car.id}>{car.name}</a></div>)}
            <button onClick={(e) => navigate('new')}>Create new car</button>
        </div>  
    );
}
export default AboutPage;