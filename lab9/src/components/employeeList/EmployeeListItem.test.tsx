// noinspection DuplicatedCode

import React from "react";
import {screen, render} from "@testing-library/react";
import EmployeeListItem from "./EmployeeListItem";
import {Employee} from "../../model/Employee";

/*
getBy - finds or throws error - for standard use
queryBy - finds or returns null - used to verify that something is not there
findBy - async, finds or throws
*/

describe('EmployeeListItem data visualization test', () => {
    const employee: Employee = {
        id: 'super-cool-id',
        name: 'Bob Marley',
        isActive: true
    };

    const noop = () => {}

    test('Component shows name of the employee', () => {

        render(<EmployeeListItem employee={employee} updateList={noop}/>)

        expect(screen.getByText('Bob Marley')).toBeTruthy()
    })
})

describe('EmployeeListItem test test', () => {
    test('EmployeeListItem dummy test', async () => {
        expect(true).toBeFalsy(); //Not implemented yet
    });
});
