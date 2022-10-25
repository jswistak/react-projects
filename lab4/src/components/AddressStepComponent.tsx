import React from 'react';
import { useEffect, useState } from "react";
import AddressData from '../types/AddressData';
import CustomerAddresses from '../types/CustomerAddresses';
import CustomerPersonalData from '../types/CustomerPersonalData';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

type TProps = {
    addressData: CustomerAddresses;
    setStep: (stepNumber: number) => void;
}

const AddressStepComponent = (props: TProps) => {
    const [invoiceAddressSameAsDelivery, setInvoiceAddressSameAsDelivery] = useState(false);
    const [error, setError] = useState({
        address: "",
        city: "",
        zipCode: "",
        Iaddress: "",
        Icity: "",
        IzipCode: ""
    });

    const validate = (formData: FormData) => {
        let isOK = true;
        let error = {
            address: "",
            city: "",
            zipCode: "",
            Iaddress: "",
            Icity: "",
            IzipCode: ""
        };
        if((formData.get('address') as string).length < 3){
            isOK = false;
            error.address = "Address is too short";
        }
        if((formData.get('city') as string).length < 3){
            isOK = false;
            error.city = "City is too short";
        }
        
        //regex to match poastal code
        const regex = /^[0-9]{2}-[0-9]{3}$/;
        if(!regex.test(formData.get('zipCode') as string)){
            isOK = false;
            error.zipCode = "Zip Code is incorrect";
        }
        

        if(!invoiceAddressSameAsDelivery){
            
            if((formData.get('i-address') as string).length < 3){
                isOK = false;
                error.Iaddress = "Address is too short";
            }
            if((formData.get('i-city') as string).length < 3){
                isOK = false;
                error.Icity = "City is too short";
            }
            
            if(!regex.test(formData.get('i-zipCode') as string)){
                isOK = false;
                error.IzipCode = "Zip Code is incorrect";
            }
        }
        
        setError(error);
        return isOK;
    }


    return (
        <form onSubmit={(e) => {
            const formData = new FormData(e.currentTarget);
            e.preventDefault();
            if(validate(formData)){

                props.addressData.deliveryAddress.street = formData.get('address') as string;
                props.addressData.deliveryAddress.city = formData.get('city') as string;
                props.addressData.deliveryAddress.zipCode = formData.get('zipCode') as string;

                props.addressData.invoiceAddress.street = formData.get('i-address') as string;
                props.addressData.invoiceAddress.city = formData.get('i-city') as string;
                props.addressData.invoiceAddress.zipCode = formData.get('i-zipCode') as string;
                if(invoiceAddressSameAsDelivery){
                    props.addressData.invoiceAddress = props.addressData.deliveryAddress;
                }
                console.log(props.addressData);
                props.setStep(2);
            }
        }}>
            <Box style={{margin: "25px"}}>
                <div>
                    <TextField id="address" name="address" label="Address" variant="outlined" error={error.address !== ""} helperText={error.address}/>
                </div>
                <div>
                    <TextField id="city" name="city" label="City" variant="outlined" error={error.city !== ""} helperText={error.city} />
                </div>
                <div>
                    <TextField id="zipCode" name="zipCode" label="Zip Code" variant="outlined" error={error.zipCode !== ""} helperText={error.zipCode} />
                </div>

            </Box>
            <FormControlLabel control={<Checkbox value={invoiceAddressSameAsDelivery} onClick={() =>  setInvoiceAddressSameAsDelivery(!invoiceAddressSameAsDelivery)}/>} label="Invoice the same as delivery?" />


            <Box style={{margin: "25px"}}>
                <div>
                    <TextField id="i-address" name="i-address" label="Invoice Address" variant="outlined" error={error.Iaddress !== ""} helperText={error.Iaddress} disabled={invoiceAddressSameAsDelivery}/>
                </div>
                <div>
                    <TextField id="i-city" name="i-city" label="Invoice City" variant="outlined" error={error.Icity !== ""} helperText={error.Icity} disabled={invoiceAddressSameAsDelivery}/>
                </div>
                <div>
                    <TextField id="i-zipCode" name="i-zipCode" label="Invoice Zip Code" variant="outlined" error={error.IzipCode !== ""} helperText={error.IzipCode} disabled={invoiceAddressSameAsDelivery}/>
                </div>
            </Box>
            <Button onClick={() => props.setStep(0)}>Go back</Button>
            <Button
                variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </form>

    );

}

export default AddressStepComponent;