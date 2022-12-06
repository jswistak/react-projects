/* eslint-disable testing-library/no-node-access */
import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";

/*
getBy - finds or throws error - for standard use
queryBy - finds or returns null - used to verify that something is not there
findBy - async, finds or throws
*/

//region module mocks
jest.mock("./employeeList/EmployeeList", () => {
    return function EmployeeListMock() {
        return (
            <div>EmployeeListMock</div>
        );
    };
});
//endregion

describe('App component test', () => {
    test('Mocked EmployeeList should be rendered in App', () => {
        render(<App/>);
        expect(screen.getByText('EmployeeListMock')).toBeTruthy();
    });
});

describe('App snapshot tests', () => {
    test('App with mocked List should match inline snapshot', () => {
        const {container} = render(<App/>);
        expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      EmployeeListMock
    </div>
  `)
    });

    test('App with mocked List should match snapshot', () => {
        const {container} = render(<App/>);
        expect(container.firstChild).toMatchSnapshot();
    })
});