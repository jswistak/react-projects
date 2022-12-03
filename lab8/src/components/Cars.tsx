import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { carsState } from '../data/atom'
import { Car } from '../data/Car'
const AboutPage = () => {

    const [cars, setCars] = useRecoilState(carsState)
    const navigate = useNavigate();

    return (
        <div>
            {cars.map((car: Car) => <div key={'car' + car.id}><a href={'/cars/'+car.id}>{car.name}</a></div>)}
            <button onClick={(e) => navigate('new')}>Create new car</button>
        </div>  
    );
}
export default AboutPage;