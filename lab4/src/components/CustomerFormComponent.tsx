import { render } from '@testing-library/react';
import React from 'react';
import { useEffect, useState } from "react";
import NameStepComponent from "./NameStepComponent";
import AddressStepComponent from "./AddressStepComponent";
import SummaryStepComponent from "./SummaryStepComponent";
import AddressData from '../types/AddressData';
import CustomerPersonalData from '../types/CustomerPersonalData';
import CustomersAddresses from '../types/CustomerAddresses';

const CustomerFormComponent = () =>{
    const[step, setStep] = useState(0);
    const[customerPersonalData, setCustomer] = useState(new CustomerPersonalData("", "", ""));
    const[addressData, setAddress] = useState<CustomersAddresses>({ 
        deliveryAddress: new AddressData("", "", ""),
        invoiceAddress: new AddressData("", "", "")
    });
    
    const renderStep = () => {
        switch(step){
            case 0:
                return <NameStepComponent customerPersonalData={customerPersonalData} onSubmit={() => setStep(1)}/>;
            case 1:
                return <AddressStepComponent addressData={addressData} setStep={setStep}/>;
            case 2:
                return <SummaryStepComponent customerPersonalData={customerPersonalData} addressData={addressData} setStep={setStep}/>;
        }
    }

    return (
        <div style={{margin: "25px"}}>
            {renderStep()}
        </div>
    );  
}

export default CustomerFormComponent;