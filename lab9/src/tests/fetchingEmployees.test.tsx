// noinspection DuplicatedCode

import {render, screen} from "@testing-library/react";
import React from "react";
import {setupServer} from "msw/node";
import EmployeeList from "../components/employeeList/EmployeeList";
import {rest} from "msw";

/*
getBy - finds or throws error - for standard use
queryBy - finds or returns null - used to verify that something is not there
findBy - async, finds or throws
*/

//region server mock
const server = setupServer(
    rest.get('*/employees', (request, response, ctx) => {
        return response(ctx.json([
                {
                    "id": "5dc9bdc63d2a39982fbf83d8",
                    "isActive": true,
                    "name": "Bates Parker"
                },
                {
                    "id": "5dc9bdc6f0c10cec4f579a65",
                    "isActive": false,
                    "name": "Hobbs Sullivan"
                },
                {
                    "id": "5dc9bdc6cd6f618976e00dfa",
                    "isActive": true,
                    "name": "Alisha Stephenson"
                }
            ]
        ));
    })
)
//endregion

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
});
afterAll(() => server.close());

describe('EmployeeList fetch test', () => {
    test('EmployeeList should render components for each fetched item', async () => {
        render(<EmployeeList/>);

        expect(await screen.findByText("5dc9bdc63d2a39982fbf83d8.")).toBeTruthy();
        expect(await screen.findByText("5dc9bdc6f0c10cec4f579a65.")).toBeTruthy();
        expect(await screen.findByText("5dc9bdc6cd6f618976e00dfa.")).toBeTruthy();
    });

    test('EmployeeList should render delete buttons for each list item', async () => {
        render(<EmployeeList/>);

        expect(await screen.findByText("5dc9bdc63d2a39982fbf83d8.")).toBeTruthy();

        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(4);
        expect(buttons[0]).toHaveTextContent("Delete");
        expect(buttons[1]).toHaveTextContent("Delete");
        expect(buttons[2]).toHaveTextContent("Delete");
        expect(buttons[3]).toHaveTextContent("Add employee");
    });
});
