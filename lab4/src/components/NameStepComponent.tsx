import React from 'react';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import CustomerPersonalData from '../types/CustomerPersonalData';
import { Box } from '@mui/material';

type TProps = {
    customerPersonalData: CustomerPersonalData;
    onSubmit: () => void;
}


const NameStepComponent = (props: TProps) =>{
    

    return (
        <Box>
            <TextField id="name" label="Name" variant="outlined" />
            <TextField id="surname" label="Surname" variant="outlined" />
            <TextField id="email" label="Email" variant="outlined" />
        </Box>
    );
}

export default NameStepComponent;