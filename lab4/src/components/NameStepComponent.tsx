import React from 'react';
import { useEffect, useState } from "react";
import CustomerPersonalData from '../types/CustomerPersonalData';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { isKeyObject } from 'util/types';

type TProps = {
    customerPersonalData: CustomerPersonalData;
    onSubmit: (customerPersonalData: CustomerPersonalData) => void;
}


const NameStepComponent = (props: TProps) => {
    const [error, setError] = useState({
        name: "",
        email: "",
        surname: ""
    });
    const validateName = ():boolean => {
        //TODO
        if(formData.name.length < 1){
            setError((prevError) => ({...prevError, name: "Name is too short"}));
            return false;
        }
        else{
            setError((prevError) => ({...prevError, name: ""}));
        }
        console.log(formData.name.length);
        return true;
    }
    const validateLastName = ():boolean => {
        if(formData.lastName.length < 1){
            setError((prevError) => ({...prevError, surname: "Surname is too short"}));
            return false;
        }
        else{
            setError((prevError) => ({...prevError, surname: ""}));
        }
        console.log("validateLastName");
        return true;
    }
    const validateEmail = ():boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(formData.email)){
            setError((prevError) => ({...prevError, email: "Incorrect email"}));
            return false;
        }
        else{
            setError((prevError) => ({...prevError, email: ""}));
        }
        console.log("validateEmail");
        return true;
    }
     
    const validate = (): boolean => {
        let isOK: boolean = true;
        isOK = validateName() && isOK;
        isOK = validateLastName() && isOK;
        isOK = validateEmail() && isOK;
        return isOK;
    }
    const [formData, setFormData] = useState(new CustomerPersonalData("", "", ""));
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));

        //console.log(event.target.name);
    }

    return (
        <form onSubmit={(e) => {            
            e.preventDefault();
            if(validate()) {
                console.log(formData);
                props.onSubmit(formData);
            }


        }}>
            <Box>
                <div>
                    <TextField 
                        id="name" name="name" label="Name" value={formData.name} 
                        variant="outlined" error={error.name !== ""} helperText={error.name} 
                        onChange={onInputChange} onBlur={validateName}/>
                </div>
                <div>
                    <TextField 
                        id="lastName" name="lastName" label="Last Name" value={formData.lastName} 
                        variant="outlined" error={error.surname !== ""} helperText={error.surname} 
                        onChange={onInputChange} onBlur={validateLastName}/>
                </div>
                <div>
                    <TextField 
                        id="email" name="email" label="Email" value={formData.email} 
                        variant="outlined" error={error.email !== ""} helperText={error.email} 
                        onChange={onInputChange} onBlur={validateEmail}/>
                </div>
                <Button
                    variant="contained" color="primary" type="submit">
                    Next
                </Button>
            </Box>
        </form>

    );
}

export default NameStepComponent;