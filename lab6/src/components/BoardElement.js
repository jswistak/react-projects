import React from 'react';
import { useEffect, useState } from "react";



const BoardElement = (props) => {

    //console.log(props.value)
    return (
        <div style={{ 
            width: "20px",
            height: "20px", 
            backgroundColor: props.value ? '#69f542' : '#222222', 
            float: "left"
            
            }}>
            
        </div>

    );

}

export default BoardElement;