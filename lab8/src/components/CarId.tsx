import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { carsState } from '../data/atom';
import Error404Page from './Error404Page';
import { Car } from '../data/Car'

const CarId = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [cars, setCars] = useRecoilState(carsState)
    const currentCar = cars.find((car: Car) => car.id == id)
    console.log(id, currentCar)
    if(!currentCar){
        return <Error404Page/> 
    }
    return (
        <div className="CarIdPage">
             <p>{JSON.stringify(currentCar)}</p>
        </div>
    );
}
export default CarId;