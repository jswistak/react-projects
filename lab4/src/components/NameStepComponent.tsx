import React from 'react';
import { useEffect, useState } from "react";
import CustomerPersonalData from '../types/CustomerPersonalData';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

type TProps = {
    customerPersonalData: CustomerPersonalData;
    onSubmit: () => void;
}


const NameStepComponent = (props: TProps) => {
    const [error, setError] = useState({
        name: "",
        email: "",
        surname: ""
    });
    const validate = (formData: FormData) => {
        let isOK = true;
        let error = {
            name: "",
            email: "",
            surname: ""
        };
        if((formData.get('name') as string).length < 3){
            isOK = false;
            error.name = "Name is too short";
        }
        if((formData.get('surname') as string).length < 3){
            isOK = false;
            error.surname = "Surname is too short";
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(formData.get('email') as string)){
            isOK = false;
            error.email = "Incorrect email";
        }
        setError(error);
        return isOK;
    }
    return (
        <form onSubmit={(e) => {
            const formData = new FormData(e.currentTarget);
            e.preventDefault();

            //WHY IS THIS NOT WORKING? - how to correct it
            //props.customerPersonalData = new CustomerPersonalData(
            //    formData.get('name') as string, formData.get('surname') as string, formData.get('email') as string));

            if (validate(formData)) {
                props.customerPersonalData.name = formData.get('name') as string;
                props.customerPersonalData.lastName = formData.get('surname') as string;
                props.customerPersonalData.email = formData.get('email') as string;
                console.log(props.customerPersonalData);

                props.onSubmit();
            }


        }}>
            <Box>
                <div>
                    <TextField id="name" name="name" label="Name" variant="outlined" error={error.name !== ""} helperText={error.name} />
                </div>
                <div>
                    <TextField id="surname" name="surname" label="Surname" variant="outlined" error={error.surname !== ""} helperText={error.surname} />
                </div>
                <div>
                    <TextField id="email" name="email" label="Email" variant="outlined" error={error.email !== ""} helperText={error.email} />
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