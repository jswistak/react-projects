import React from 'react';
import { useEffect, useState } from "react";
import CustomerPersonalData from '../types/CustomerPersonalData';
import CustomerAddresses from '../types/CustomerAddresses';

type TProps = {
    customerPersonalData: CustomerPersonalData;
    addressData: CustomerAddresses;
    setStep: (stepNumber:number) => void;
}

const SummaryStepComponent = (props: TProps) =>{
    

    return (
        <div>

        </div>
    );
    
}

export default SummaryStepComponent;