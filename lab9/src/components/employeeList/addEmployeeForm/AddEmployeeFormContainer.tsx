import React, {useState} from 'react';
import AddEmployeeForm from "./AddEmployeeForm";
import {Employee} from "../../../model/Employee";
import {addEmployee} from "../../../logic/api";
import Loader from "../../utils/Loader";

export interface AddEmployeeProps {
    updateList: () => void;
}

const AddEmployeeFormContainer: React.FC<AddEmployeeProps> = (props: AddEmployeeProps) => {
    const [loading, setLoading] = useState(false);
    const [shown, setShown] = useState(false);

    return (
        <Loader loading={loading} label="Saving">
            {!shown ? <button onClick={() => setShown(true)}>Add employee</button>: ''}
            {shown ? <AddEmployeeForm saveEmployee={(employee: Employee) => {
                setLoading(true);
                addEmployee(employee)
                .then(() => props.updateList())
                .catch((error) => console.error(JSON.stringify(error)))
                .finally(() => setLoading(false));
            }} hideForm={() => setShown(false)}/> : ''}
        </Loader>
    )
}

export default AddEmployeeFormContainer;
