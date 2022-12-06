import React, {useState} from 'react';
import AddEmployeeForm from "./AddEmployeeForm";
import {Employee} from "../../../model/Employee";
import {addEmployee} from "../../../logic/api";
import Loader from "../../utils/Loader";

export interface AddEmployeeProps {
    updateList: () => void;
}

const AddEmployeeFormContainer: React.FC<AddEmployeeProps> = (props: AddEmployeeProps) => {
    return (
        <></>
    )
}

export default AddEmployeeFormContainer;
