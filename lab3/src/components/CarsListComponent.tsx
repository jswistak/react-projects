import React from 'react';
import { useEffect, useState } from "react";
import { CARS, Car } from '../data/Car';
import CarsListItemComponent from './CarsListItemComponent';
import '../css/CarsList.css';

type TProps= {
    car: Car;
}

const CarsListComponent = () =>{
    const [cars, setCars] = useState(CARS);
    const [searchQuerry, setSearchQuerry] = useState("");
    const [serachInputValue, setSearchInputValue] = useState("");
    
    const removeFunction = (id: Number) => {
        setCars(cars.filter(x => x.id !== id));
    }
    const editPriceFunction = (id: number, price: number) => {
        console.log("Editing " + id + " " + price);
        const newState : Car[] = cars.map(car => {
            if(car.id === id){
                return {...car, pricePerDay: price};
            }
            return car;
        
        });
        setCars(newState);
        
    }

    return (
        <div className="car-list">
            <input type="text" onChange={(e) => setSearchInputValue(e.target.value)} placeholder="Search" />
            <button onClick={(e) => setSearchQuerry(serachInputValue)}>Search</button>
            <ul>
            
            {cars.filter(car => car.name.toLowerCase()
                .includes(searchQuerry.toLowerCase()))
                .map(car => (<li key={"car" + car.id}><CarsListItemComponent car={car} remove={removeFunction} edit={editPriceFunction} id={car.id} />
                    </li>))}
            </ul>
            

        </div>
    );
    
}

export default CarsListComponent;