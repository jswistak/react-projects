import React from 'react';
import { useEffect, useState } from "react";
import AddressData from '../types/AddressData';
import CustomerAddresses from '../types/CustomerAddresses';
import CustomerPersonalData from '../types/CustomerPersonalData';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

type TProps = {
    addressData: CustomerAddresses;
    goBack: () => void;
    onSubmit: (addressData: CustomerAddresses) => void;
}

const AddressStepComponent = (props: TProps) => {
    const [invoiceAddressSameAsDelivery, setInvoiceAddressSameAsDelivery] = useState(false);
    const [error, setError] = useState({
        deliveryAddress: new AddressData("", "", ""),
        invoiceAddress: new AddressData("", "", "")
    });
    const regex = /^[0-9]{2}-[0-9]{3}$/;
    
    const validateDeliveryStreet = () => {
        if(invoiceAddressSameAsDelivery){
            setFormData((prev) => ({...prev , invoiceAddress: {...prev.invoiceAddress, street: formData.deliveryAddress.street}}));
            console.log(formData);
        }
        if(error.deliveryAddress.street.length < 3){
            setError((prevError) => ({...prevError, deliveryAddress: {
                street: "Street is too short",
                zipCode: prevError.deliveryAddress.zipCode,
                city: prevError.deliveryAddress.city
            }}));
        }
        else{
            setError((prevError) => ({...prevError, deliveryAddress: {
                street: "",
                zipCode: prevError.deliveryAddress.zipCode,
                city: prevError.deliveryAddress.city
            }}));
        }
    }
    const validateDeliveryCity = () => {
        if(invoiceAddressSameAsDelivery){
            setFormData((prev) => ({...prev , invoiceAddress: {...prev.invoiceAddress, city: formData.deliveryAddress.city}}));
        }
        if(!regex.test(formData.deliveryAddress.zipCode)){
            setError((prevError) => ({...prevError, deliveryAddress: {
                street: prevError.deliveryAddress.street,
                zipCode: prevError.deliveryAddress.zipCode,
                city: "City is too short",
            }}));
        }
        else{
            setError((prevError) => ({...prevError, deliveryAddress: {
                street: prevError.deliveryAddress.street,
                zipCode: prevError.deliveryAddress.zipCode,
                city: ""
            }}));
        }
    }
    const validateDeliveryZipCode = () => {
        if(invoiceAddressSameAsDelivery){
            setFormData((prev) => ({...prev , invoiceAddress: {...prev.invoiceAddress, street: formData.deliveryAddress.zipCode}}));
        }
        if(!regex.test(formData.deliveryAddress.zipCode)){
            setError((prevError) => ({...prevError, deliveryAddress: {
                street: prevError.deliveryAddress.street,
                zipCode: "Wrong zip code",
                city: prevError.deliveryAddress.city
            }}));
        }
        else{
            setError((prevError) => ({...prevError, deliveryAddress: {
                street: prevError.deliveryAddress.street,
                zipCode: "",
                city: prevError.deliveryAddress.city
            }}));
        }
    }

    //invoice validation
    const validateInvoiceStreet = () => {
        if(error.invoiceAddress.street.length < 3){
            setError((prevError) => ({...prevError, invoiceAddress: {
                street: "Street is too short",
                zipCode: prevError.invoiceAddress.zipCode,
                city: prevError.invoiceAddress.city
            }}));
        }
        else{
            setError((prevError) => ({...prevError, invoiceAddress: {
                street: "",
                zipCode: prevError.invoiceAddress.zipCode,
                city: prevError.invoiceAddress.city
            }}));
        }
    }
    const validateInvoiceCity = () => {
        
        if(!regex.test(formData.invoiceAddress.zipCode)){
            setError((prevError) => ({...prevError, invoiceAddress: {
                street: prevError.invoiceAddress.street,
                zipCode: prevError.invoiceAddress.zipCode,
                city: "City is too short",
            }}));
        }
        else{
            setError((prevError) => ({...prevError, invoiceAddress: {
                street: prevError.invoiceAddress.street,
                zipCode: prevError.invoiceAddress.zipCode,
                city: ""
            }}));
        }
    }
    const validateInvoiceZipCode = () => {
        
        if(!regex.test(formData.invoiceAddress.zipCode)){
            setError((prevError) => ({...prevError, invoiceAddress: {
                street: prevError.invoiceAddress.street,
                zipCode: "Wrong zip code",
                city: prevError.invoiceAddress.city
            }}));
        }
        else{
            setError((prevError) => ({...prevError, invoiceAddress: {
                street: prevError.invoiceAddress.street,
                zipCode: "",
                city: prevError.invoiceAddress.city
            }}));
        }
    }



    const validate = () => {
        validateDeliveryStreet();
        validateDeliveryCity();
        validateDeliveryZipCode();

        if (!invoiceAddressSameAsDelivery) {
            validateInvoiceStreet();
            validateInvoiceCity();
            validateInvoiceZipCode();
            
        }
        //setError(error);
        return (error.deliveryAddress === new AddressData("", "", "")  
            && error.invoiceAddress === new AddressData("", "", ""));
    }
    const [formData, setFormData] = useState({
        deliveryAddress: new AddressData("", "", ""),
        invoiceAddress: new AddressData("", "", "")
    });
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
        

        console.log(event.target.name);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            
            if (validate()) {
                
                if (invoiceAddressSameAsDelivery) {
                    setFormData((prev) => ({...prev , invoiceAddress: prev.invoiceAddress}));
                    //props.onSubmit(new CustomerAddresses(formData.deliveryAddress, formData.deliveryAddress));
                }
                console.log(formData);
                props.onSubmit(formData);
                
            }
        }}>
            <Box style={{ margin: "25px" }}>
                <div>
                    <TextField id="address" name="deliveryAddress.street" label="Address" variant="outlined"
                        error={error.deliveryAddress.street !== ""} helperText={error.deliveryAddress.street} 
                        onChange={onInputChange} onBlur={validateDeliveryStreet}/>
                </div>
                <div>
                    <TextField id="city" name="deliveryAddress.city" label="City" variant="outlined"
                        error={error.deliveryAddress.city !== ""} helperText={error.deliveryAddress.city} 
                        onChange={onInputChange} onBlur={validateDeliveryCity}/>
                </div>
                <div>
                    <TextField id="zipCode" name="deliveryAddress.zipCode" label="Zip Code" variant="outlined"
                        error={error.deliveryAddress.zipCode !== ""} helperText={error.deliveryAddress.zipCode} 
                        onChange={onInputChange} onBlur={validateDeliveryZipCode}/>
                </div>

            </Box>
            <FormControlLabel control={<Checkbox value={invoiceAddressSameAsDelivery}
                onClick={() => setInvoiceAddressSameAsDelivery(!invoiceAddressSameAsDelivery)} />} label="Invoice the same as delivery?" />


            <Box style={{ margin: "25px" }}>
                <div>
                    <TextField id="i-address" name="invoiceAddress.street" label="Invoice Address" variant="outlined"
                        error={error.invoiceAddress.street !== ""} helperText={error.invoiceAddress.street} disabled={invoiceAddressSameAsDelivery} 
                        onChange={onInputChange} onBlur={validateInvoiceStreet}/>
                </div>
                <div>
                    <TextField id="i-city" name="invoiceAddress.city" label="Invoice City" variant="outlined"
                        error={error.invoiceAddress.city !== ""} helperText={error.invoiceAddress.city} disabled={invoiceAddressSameAsDelivery} 
                        onChange={onInputChange} onBlur={validateInvoiceCity}/>
                </div>
                <div>
                    <TextField id="i-zipCode" name="invoiceAddress.zipCode" label="Invoice Zip Code" variant="outlined"
                        error={error.invoiceAddress.zipCode !== ""} helperText={error.invoiceAddress.zipCode} disabled={invoiceAddressSameAsDelivery} 
                        onChange={onInputChange} onBlur={validateInvoiceZipCode}/>
                </div>
            </Box>
            <Button onClick={props.goBack}>Go back</Button>
            <Button
                variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </form>

    );

}

export default AddressStepComponent;