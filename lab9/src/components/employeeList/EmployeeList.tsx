import React, {useEffect, useState} from 'react';
import {getEmployees} from "../../logic/api";
import EmployeeListItem from "./EmployeeListItem";
import {Employee} from "../../model/Employee";
import Loader from "../utils/Loader";
import AddEmployeeFormContainer from './addEmployeeForm/AddEmployeeFormContainer';

const EmployeeList: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        getEmployees().then((employees) => { setEmployees(employees); })
        .catch((error) => { console.error(JSON.stringify(error)); })
        .finally(() => setLoading(false));
    }, []);
    return (
        <Loader loading={loading}>
            <h1>Employee list</h1>
            {employees.map(employees => <EmployeeListItem key={employees.id} updateList={() => {}}
            employee={employees}/>)}
            <AddEmployeeFormContainer updateList={() => {}}/>
        </Loader>
        
    );
}
export default EmployeeList;
