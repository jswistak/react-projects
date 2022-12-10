import React, {useState} from 'react';
import {generateKey} from "../../../utils/generateKey";
import {Employee} from "../../../model/Employee";

export interface AddEmployeeFormProps {
    saveEmployee: (employee: Employee) => void;
    hideForm: () => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = (props: AddEmployeeFormProps) => {
    const [name, setName] = useState('');

    return (
        <form>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
            <button type="button" onClick={() => props.hideForm()}>Cancel</button>
            <button type="button" onClick={() => {
                props.saveEmployee({
                    id: generateKey(),
                    name: name,
                    isActive: true,
                });
            }}>Save</button>
        </form>
    )
}

export default AddEmployeeForm;
