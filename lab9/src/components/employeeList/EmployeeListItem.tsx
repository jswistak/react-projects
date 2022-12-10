import React, {useState} from 'react';
import {Employee} from "../../model/Employee";
import { deleteEmployee } from "../../logic/api";
import Loader from "../utils/Loader";


export interface EmployeeListItemProps {
    employee: Employee;
    updateList: () => void;
}

const EmployeeListItem: React.FC<EmployeeListItemProps> = (props: EmployeeListItemProps) => {
    const [loading, setLoading] = useState(false);
    const deleteClicked = () => {
        //console.log(props.employee.id);
        setLoading(true)
        deleteEmployee(props.employee.id)
            .then(() => props.updateList())
            .catch((error) => console.error(JSON.stringify(error)))
            .finally(() => {setLoading(false)});
            
    };
    return (
        <div key={props.employee.id}>
            <Loader loading={loading} label="Deleting">
                <p style={{display: "none"}}>{props.employee.id}.</p>
                {props.employee.name}
                <button onClick={deleteClicked}>Delete</button>
            </Loader>
        </div>
    );
}

export default EmployeeListItem;
