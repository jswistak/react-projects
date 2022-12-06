/* eslint-disable testing-library/no-node-access */
import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import AddEmployeeForm from "./AddEmployeeForm";

/*
getBy - finds or throws error - for standard use
queryBy - finds or returns null - used to verify that something is not there
findBy - async, finds or throws
*/

const noAction = () => {
}

describe('AddEmployeeForm component test', () => {
    test('AddEmployeeForm should render form with input and buttons', () => {
        const {container} = render(<AddEmployeeForm hideForm={noAction} saveEmployee={noAction}/>);

        expect(container.firstElementChild?.tagName).toBe('FORM');

        expect(screen.getByRole('textbox')).toBeTruthy();

        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
        expect(buttons[0]).toHaveTextContent('Cancel');
        expect(buttons[1]).toHaveTextContent('Save');
    });
});

describe('AddEmployeeForm component interaction test', () => {
    test('AddEmployeeForm should handle input', () => {
        render(<AddEmployeeForm hideForm={noAction} saveEmployee={noAction}/>);

        const input = screen.getByRole('textbox');

        fireEvent.change(input, {target: {value: 'ABC'}})
        expect(input).toHaveValue('ABC');
    });

    test('AddEmployeeForm should handle cancel click', () => {
        const onReset = jest.fn();
        render(<AddEmployeeForm hideForm={onReset} saveEmployee={noAction}/>);

        fireEvent.click(screen.getByText('Cancel'));

        expect(onReset).toHaveBeenCalled();
    });

    test('AddEmployeeForm should save click', () => {
        const onSubmit = jest.fn();
        render(<AddEmployeeForm hideForm={noAction} saveEmployee={onSubmit}/>);

        fireEvent.click(screen.getByText('Save'));

        expect(onSubmit).toHaveBeenCalled();
    });
});

describe('AddEmployeeForm component object generation test', () => {
    test('AddEmployeeForm should set isActive to true', () => {
        const onSubmit = jest.fn();
        render(<AddEmployeeForm hideForm={noAction} saveEmployee={onSubmit}/>);

        fireEvent.click(screen.getByText('Save'));

        expect(onSubmit).toHaveBeenCalled();

        const params = onSubmit.mock.calls[0][0]
        expect(params.isActive).toBeTruthy();
    });

    test('AddEmployeeForm should set name according to the form', () => {
        const onSubmit = jest.fn();
        render(<AddEmployeeForm hideForm={noAction} saveEmployee={onSubmit}/>);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'ABC'}})
        fireEvent.click(screen.getByText('Save'));

        const params = onSubmit.mock.calls[0][0]
        expect(params.name).toBe('ABC');
    });
});