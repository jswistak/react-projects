import React from 'react';
import { useEffect, useState } from "react";
import AddressData from '../types/AddressData';
import CustomerAddresses from '../types/CustomerAddresses';
import CustomerPersonalData from '../types/CustomerPersonalData';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useCallback } from 'react';

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
    const [formData, setFormData] = useState({
        deliveryAddress: new AddressData("", "", ""),
        invoiceAddress: new AddressData("", "", "")
    });
    const regex = /^[0-9]{2}-[0-9]{3}$/;
    
    const validateDeliveryStreet = () => {
        if(invoiceAddressSameAsDelivery){
            setFormData((prev) => ({...prev , invoiceAddress: {...prev.invoiceAddress, street: formData.deliveryAddress.street}}));
        }
        if(formData.deliveryAddress.street.length < 3){
            setError((prevError) => ({...prevError, deliveryAddress: {
                ...prevError.deliveryAddress,
                street: "Street is too short",
            }}));
            return false;
        }
        else{
            setError((prevError) => ({...prevError, deliveryAddress: {
                ...prevError.deliveryAddress,
                street: "",
            }}));
        }
        return true;
    }
    const validateDeliveryCity = () => {
        if(invoiceAddressSameAsDelivery){
            setFormData((prev) => ({...prev , invoiceAddress: {...prev.invoiceAddress, city: formData.deliveryAddress.city}}));
        }
        if(formData.deliveryAddress.city.length < 3){
            setError((prevError) => ({...prevError, deliveryAddress: {
                street: prevError.deliveryAddress.street,
                zipCode: prevError.deliveryAddress.zipCode,
                city: "City is too short",
            }}));
            return false;
        }
        else{
            setError((prevError) => ({...prevError, deliveryAddress: {
                street: prevError.deliveryAddress.street,
                zipCode: prevError.deliveryAddress.zipCode,
                city: ""
            }}));
        }
        return true;
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
            return false;
        }
        else{
            setError((prevError) => ({...prevError, deliveryAddress: {
                street: prevError.deliveryAddress.street,
                zipCode: "",
                city: prevError.deliveryAddress.city
            }}));
        }
        return true;
    }

    //invoice validation
    const validateInvoiceStreet = () => {
        
        if(formData.invoiceAddress.street.length < 3){
            setError((prevError) => ({...prevError, invoiceAddress: {
                ...prevError.invoiceAddress,
                street: "Street is too short",
            }}));
            return false;
        }
        else{
            setError((prevError) => ({...prevError, invoiceAddress: {
                ...prevError.invoiceAddress,
                street: "",
            }}));
        }
        return true;
    }
    const validateInvoiceCity = useCallback(() => {
        
        if(formData.invoiceAddress.city.length < 3){
            setError((prevError) => ({...prevError, invoiceAddress: {
                ...prevError.invoiceAddress,
                city: "City is too short",
            }}));
            return false;
        }
        else{
            setError((prevError) => ({...prevError, invoiceAddress: {
                street: prevError.invoiceAddress.street,
                zipCode: prevError.invoiceAddress.zipCode,
                city: ""
            }}));
        }
        return true;
    }, [formData.invoiceAddress.city, setError]);
    const validateInvoiceZipCode = () => {
        
        if(!regex.test(formData.invoiceAddress.zipCode)){
            setError((prevError) => ({...prevError, invoiceAddress: {
                street: prevError.invoiceAddress.street,
                zipCode: "Wrong zip code",
                city: prevError.invoiceAddress.city
            }}));
            return false;
        }
        else{
            setError((prevError) => ({...prevError, invoiceAddress: {
                street: prevError.invoiceAddress.street,
                zipCode: "",
                city: prevError.invoiceAddress.city
            }}));
        }
        return true;
    }



    const validate = ():boolean => {
        let isValid = validateDeliveryStreet();
        isValid = validateDeliveryCity() && isValid;
        isValid = validateDeliveryZipCode() && isValid;
        if (!invoiceAddressSameAsDelivery) {
            isValid = validateInvoiceStreet() && isValid;
            isValid = validateInvoiceCity() && isValid;
            isValid = validateInvoiceZipCode() && isValid;
        }
        return isValid;
    }
    
    
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
        //console.log(event.target.name);
    }


    //Set changes of details
    const onDeliveryAddressStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, deliveryAddress: {
            ...prevFormData.deliveryAddress, street: value
            
        }}));
        if(invoiceAddressSameAsDelivery){
            setFormData((prevFormData) => ({...prevFormData, invoiceAddress: {
                ...prevFormData.invoiceAddress, street: value
                
            }}));
        }
        
    }
    const onDeliveryAddressCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, deliveryAddress: {
            ...prevFormData.deliveryAddress, city: value
            
        }}));
        if(invoiceAddressSameAsDelivery){
            setFormData((prevFormData) => ({...prevFormData, invoiceAddress: {
                ...prevFormData.invoiceAddress, city: value
                
            }}));
        }
    }

    const onDeliveryAddressZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, deliveryAddress: {
            ...prevFormData.deliveryAddress, zipCode: value
            
        }}));
        if(invoiceAddressSameAsDelivery){
            setFormData((prevFormData) => ({...prevFormData, invoiceAddress: {
                ...prevFormData.invoiceAddress, zipCode: value
                
            }}));
        }
    }
    
    //Set changes of invoice
    const onInvoiceAddressStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, invoiceAddress: {
            ...prevFormData.invoiceAddress, street: value
            
        }}));
        
    }
    const onInvoiceAddressCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, invoiceAddress: {
            ...prevFormData.invoiceAddress, city: value
            
        }}));
        
    }

    const onInvoiceAddressZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, invoiceAddress: {
            ...prevFormData.invoiceAddress, zipCode: value
            
        }}));
        
    }



    

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (invoiceAddressSameAsDelivery) {
                setFormData((prev) => ({...prev , invoiceAddress: prev.deliveryAddress}));
                //props.onSubmit(new CustomerAddresses(formData.deliveryAddress, formData.deliveryAddress));
            }
            if (validate()) {
                console.log(formData);
                props.onSubmit(formData);
                
            }
        }}>
            <Box style={{ margin: "25px" }}>
                <div>
                    <TextField id="address" name="deliveryAddress.street" label="Address" variant="outlined"
                        error={error.deliveryAddress.street !== ""} helperText={error.deliveryAddress.street} 
                        onChange={onDeliveryAddressStreetChange} value={formData.deliveryAddress.street} onBlur={validateDeliveryStreet}/>
                </div> 
                <div>
                    <TextField id="city" name="deliveryAddress.city" label="City" variant="outlined"
                        error={error.deliveryAddress.city !== ""} helperText={error.deliveryAddress.city} 
                        onChange={onDeliveryAddressCityChange} value={formData.deliveryAddress.city} onBlur={validateDeliveryCity}/>
                </div>
                <div>
                    <TextField id="zipCode" name="deliveryAddress.zipCode" label="Zip Code" variant="outlined"
                        error={error.deliveryAddress.zipCode !== ""} helperText={error.deliveryAddress.zipCode} 
                        onChange={onDeliveryAddressZipCodeChange} value={formData.deliveryAddress.zipCode} onBlur={validateDeliveryZipCode}/>
                </div>

            </Box>
            <FormControlLabel control={<Checkbox value={invoiceAddressSameAsDelivery}
                onClick={() => {
                    

                    if(!invoiceAddressSameAsDelivery){
                        setFormData((prev) => ({...prev , invoiceAddress: prev.deliveryAddress}));
                        setError((prev) => ({...prev , invoiceAddress: new AddressData("", "", "")}));
                    }
                    setInvoiceAddressSameAsDelivery(!invoiceAddressSameAsDelivery);
                }} />} label="Invoice the same as delivery?" />


            <Box style={{ margin: "25px" }}>
                <div>
                    <TextField id="i-address" name="invoiceAddress.street" label="Invoice Address" variant="outlined"
                        error={error.invoiceAddress.street !== "" && !invoiceAddressSameAsDelivery} helperText={error.invoiceAddress.street} disabled={invoiceAddressSameAsDelivery} 
                        onChange={onInvoiceAddressStreetChange} value={formData.invoiceAddress.street} onBlur={validateInvoiceStreet}/>
                </div>
                <div>
                    <TextField id="i-city" name="invoiceAddress.city" label="Invoice City" variant="outlined"
                        error={error.invoiceAddress.city !== "" && !invoiceAddressSameAsDelivery} helperText={error.invoiceAddress.city} disabled={invoiceAddressSameAsDelivery} 
                        onChange={onInvoiceAddressCityChange} value={formData.invoiceAddress.city} onBlur={validateInvoiceCity}/>
                </div>
                <div>
                    <TextField id="i-zipCode" name="invoiceAddress.zipCode" label="Invoice Zip Code" variant="outlined"
                        error={error.invoiceAddress.zipCode !== "" && !invoiceAddressSameAsDelivery} helperText={error.invoiceAddress.zipCode} disabled={invoiceAddressSameAsDelivery} 
                        onChange={onInvoiceAddressZipCodeChange} value={formData.invoiceAddress.zipCode} onBlur={validateInvoiceZipCode}/>
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