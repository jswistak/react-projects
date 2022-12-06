// noinspection DuplicatedCode

import {fireEvent, render, screen} from "@testing-library/react";
import AddEmployeeFormContainer from "../components/employeeList/addEmployeeForm/AddEmployeeFormContainer";
import React from "react";
import {setupServer} from "msw/node";
import {rest} from "msw";

/*
getBy - finds or throws error - for standard use
queryBy - finds or returns null - used to verify that something is not there
findBy - async, finds or throws
*/

const noAction = () => {
}

//region server mock
const server = setupServer(
    rest.post('*/employees', async (request, response, ctx) => {
        await new Promise(resolve => setTimeout(resolve, 150))
        // returning the sent object when successful
        return response(ctx.json(request.body));
    })
);
//endregion

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
});
afterAll(() => server.close());

//region method mocks
jest.spyOn(console, 'error');
//endregion

describe('AddEmployeeFormContainer post test', () => {
    test('AddEmployeeFormContainer should show \'saving\' label when clicked', () => {
        render(<AddEmployeeFormContainer updateList={noAction}/>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'ABC'}})
        fireEvent.click(screen.getByText('Save'));

        expect(screen.getByText("Saving...")).toBeTruthy();
    });

    test('AddEmployeeFormContainer should show the form again after having loaded', async () => {
        render(<AddEmployeeFormContainer updateList={noAction}/>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'ABC'}})
        fireEvent.click(screen.getByText('Save'));

        expect(await screen.findByText("Save")).toBeTruthy();
        expect(screen.queryByText("Saving...")).toBeFalsy();
    });

    test('AddEmployeeFormContainer should call update after having loaded', async () => {
        const updateList = jest.fn();
        render(<AddEmployeeFormContainer updateList={updateList}/>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'ABC'}})
        fireEvent.click(screen.getByText('Save'));

        expect(await screen.findByText("Save")).toBeTruthy();

        expect(updateList).toHaveBeenCalled();
    });
});

describe('AddEmployeeFormContainer error handling test', () => {
    const changeServerToThrowError = () => {
        server.use(
            rest.post('*/employees', (request, response, ctx) => {
                return response(
                    ctx.status(500),
                    ctx.json({
                        errorCode: 1,
                        errorMessage: 'Internal error',
                    })
                )
            })
        );
    }

    test('AddEmployeeFormContainer shouldn\'t crash on error', async () => {
        changeServerToThrowError();
        render(<AddEmployeeFormContainer updateList={noAction}/>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'ABC'}})
        fireEvent.click(screen.getByText('Save'));

        expect(await screen.findByText("Save")).toBeTruthy();
    });

    test('AddEmployeeFormContainer should log the error status code on error', async () => {
        changeServerToThrowError();
        expect((console.error as any).mock.calls.length).toBe(0);
        render(<AddEmployeeFormContainer updateList={noAction}/>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'ABC'}})
        fireEvent.click(screen.getByText('Save'));

        expect(await screen.findByText("Save")).toBeTruthy();
        expect((console.error as any).mock.calls.length).toBe(1);
        expect((console.error as any).mock.calls[0][0]).toContain("Error");

        expect((console.error as any).mock.calls[0][0]).toContain("500");
    });
});
