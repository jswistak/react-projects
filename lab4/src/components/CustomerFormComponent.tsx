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
    const[customerPersonalData, setCustomerPersonalData] = useState(new CustomerPersonalData("", "", ""));
    const[addressData, setAddress] = useState<CustomersAddresses>({ 
        deliveryAddress: new AddressData("", "", ""),
        invoiceAddress: new AddressData("", "", "")
    });

    const submitNameStep = (customerPersonal: CustomerPersonalData) => {
        setCustomerPersonalData(customerPersonal);
        setStep(1);
    }
    const submitAddressStep = (addressData: CustomersAddresses) => {
        setAddress(addressData);
        setStep(2);
    }
    
    const renderStep = () => {
        switch(step){
            case 0:
                return <NameStepComponent customerPersonalData={customerPersonalData} onSubmit={submitNameStep}/>;
            case 1:
                return <AddressStepComponent addressData={addressData} goBack={() => setStep(0)} onSubmit={submitAddressStep}/>;
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
