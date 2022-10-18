import React from 'react';
import { useEffect, useState } from "react";
import { CARS, Car } from '../data/Car';
import '../css/CarsListItem.css';
import { Console } from 'console';

type TProps= {
    car: Car;
    remove: Function;
    edit: Function;
    id: React.Key;
}

const CarsListItemComponent = ( props: TProps ) =>{
    const [cars, setCars] = useState(CARS);
    const [isEditing, setEditing] = useState(false);
    const [price, setPrice] = useState(props.car.pricePerDay);
    return (
        <div className="car-item">
            <div className='name next-to'><h3>{props.car.name}</h3></div>
            <div className='params next-to'>
                {props.car.AC? "has": "has no"} AC<br/>
                {props.car.doors} doors<br/> {props.car.seats} seats
            </div>
            <div className='price next-to'>
                <div className='next-to'>
                <p>Price per day {props.car.pricePerDay}</p>
                {isEditing? 
                    (<input type="text" value={price} 
                        onChange={(e) => setPrice(parseInt(e.target.value))}>
                    </input>)
                : ""}
                <button onClick={(e) => {
                    if(isEditing)
                        props.edit(props.id, price);
                    setEditing(!isEditing);
                    
                }}>{isEditing? "Save": "Edit"}</button>
                <button onClick={(e) => props.remove(props.id)}>Remove</button>
                </div>
                
                
            </div>
            <div className='clear'></div>
            
            
        </div>
    );
    
}

export default CarsListItemComponent;