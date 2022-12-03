import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { carsState } from '../data/atom'

const NewCar = () => {
    let navigate = useNavigate();
    const [cars, setCars] = useRecoilState(carsState);
    const [newCar, setNewCar] = useState('');
    const addCar = (carName: string) => {
        const newId = cars.length + 1;
        setCars([
            ...cars,
            {
                id: newId,
                name: carName,
                doors: 0,
                image: "",
                seats: 0,
                pricePerDay: 0,
                AC: false
            }
        ])
    }
    return (
        <div>
            <input type="text" onChange={(e) => {setNewCar(e.target.value)}}></input>     
            <button onClick={() => {addCar(newCar);
            navigate("/cars")}}>Save</button>
        </div>
        

        
    );

}

export default NewCar;