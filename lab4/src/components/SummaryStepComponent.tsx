import React from 'react';
import { useEffect, useState } from "react";
import CustomerPersonalData from '../types/CustomerPersonalData';
import CustomerAddresses from '../types/CustomerAddresses';
import { Button } from '@mui/material';

type TProps = {
    customerPersonalData: CustomerPersonalData;
    addressData: CustomerAddresses;
    setStep: (stepNumber: number) => void;
}

const SummaryStepComponent = (props: TProps) => {


    return (
        <div>
            Name: {props.customerPersonalData.name} <br />
            Last Name: {props.customerPersonalData.lastName} <br />
            Email: {props.customerPersonalData.email} <br />

            Delivery Address: {props.addressData.deliveryAddress.street} <br />
            {props.addressData.deliveryAddress.zipCode} {props.addressData.deliveryAddress.city} <br />

            Invoice Address: {props.addressData.invoiceAddress.street} <br />
            {props.addressData.invoiceAddress.zipCode} {props.addressData.invoiceAddress.city} <br />
            <div>
                <Button onClick={() => props.setStep(0)}>Go to the first part</Button>
                <Button onClick={() => props.setStep(1)}>Go to the second part</Button>
            </div>
        </div>

    );

}

export default SummaryStepComponent;