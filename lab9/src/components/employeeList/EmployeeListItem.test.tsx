// noinspection DuplicatedCode

import React from "react";
import {screen, render, act, fireEvent} from "@testing-library/react";
import EmployeeListItem from "./EmployeeListItem";
import {Employee} from "../../model/Employee";

/*
getBy - finds or throws error - for standard use
queryBy - finds or returns null - used to verify that something is not there
findBy - async, finds or throws
*/
const employee: Employee = {
        id: 'super-cool-id',
        name: 'Bob Marley',
        isActive: true
    };

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

describe('EmployeeListItem test', () => {
    const employee: Employee = {
        id: 'super-cool-id',
        name: 'Bob Marley',
        isActive: true
    };
    test('EmployeeListItem should render name', async () => {
        render(<EmployeeListItem employee={employee} updateList={() => {}}/>)
        expect(screen.getByText(employee.name)).toBeTruthy();
    });
    test('EmployeeListItem should render remove button', async () => {
        render(<EmployeeListItem employee={employee} updateList={() => {}}/>)
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(1);
        expect(buttons[0]).toHaveTextContent('Delete');
    });
    test('EmployeeListItem test loading', async () => {
        render(<EmployeeListItem employee={employee} updateList={() => {}}/>)
        expect(screen.getByText('Bob Marley')).toBeTruthy()
        let button = screen.getByText('Delete');
        fireEvent.click(button);
        expect(screen.findByText('Deleting...')).toBeTruthy();
    });
});

describe('Snapshot test EmployeeListItem', () => {
    test('EmployeeListItem with mocked employee should match snapshot', () => {
        const { container } = render(<EmployeeListItem employee={employee} updateList={() => {}}/>);
        expect(container.firstChild).toMatchSnapshot();
    })
});

