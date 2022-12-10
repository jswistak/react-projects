// noinspection DuplicatedCode

import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import AddEmployeeFormContainer from "../components/employeeList/addEmployeeForm/AddEmployeeFormContainer";
import React from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import EmployeeList from "../components/employeeList/EmployeeList";
import { getEmployees } from "../logic/api";

/*
getBy - finds or throws error - for standard use
queryBy - finds or returns null - used to verify that something is not there
findBy - async, finds or throws
*/

const noAction = () => {
}
let employees = [
    {
        id: '5dc9bdc63d2a39982fbf83d8',
        isActive: true,
        name: 'Bates Parker',
    },
    {
        id: '5dc9bdc6f0c10cec4f579a65',
        isActive: false,
        name: 'Hobbs Sullivan',
    },
    {
        id: '5dc9bdc6cd6f618976e00dfa',
        isActive: true,
        name: 'Alisha Stephenson',
    },
]
//region server mock
const server = setupServer(
    rest.get('*/employees', (request, response, ctx) => response(ctx.json(employees))),
    rest.delete('*/employees/:id', (request, response, ctx) => {
        const id = request.params.id;
        if (!employees.find(employee => employee.id === id)) return response(ctx.status(404));
        employees = employees.filter(employee => employee.id !== id);
        return response(ctx.status(200));
    }),
);
//endregion

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
});
afterAll(() => server.close());

//region method mocks
jest.spyOn(console, 'error');
//endregion

describe('EmployeeList delete test', () => {
    test('EmployeeList test deleting', async () => {
        render(<EmployeeList />);

        expect(await screen.findByText("5dc9bdc63d2a39982fbf83d8.")).toBeTruthy();
        const button = within(screen.getByText('Bates Parker')).getByRole('button');
        
        fireEvent.click(button);

        await waitFor(() => expect(screen.queryByText("Deleting...")).toBeFalsy());

        const list = await getEmployees();
        expect(list.length).toBe(2);

        
    });


});
