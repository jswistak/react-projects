import {Employee} from "../model/Employee";
import {Key} from "react";

const BASE_URL = 'http://localhost:3001';

export const getEmployees: () => Promise<Employee[]> = async () => {
    return fetch(BASE_URL + '/employees').then(response => {
        if(!response.ok)
            throw response;
        return response.json();
    });
     
}

export const addEmployee = async (employee: Employee) => {
    return fetch(BASE_URL + '/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    }).then(response => {
        if(!response.ok)
            throw response;
        return response.json();
    });
}

export const deleteEmployee = async (employeeId: Key) => {
    return fetch(BASE_URL + '/employees/' + employeeId, {
        method: 'DELETE'
    }).then(response => {
        if(!response.ok)
            throw response;
        return response.json();
    });
}