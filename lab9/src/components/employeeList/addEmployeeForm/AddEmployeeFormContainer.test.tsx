import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import AddEmployeeFormContainer from "./AddEmployeeFormContainer";

/*
getBy - finds or throws error - for standard use
queryBy - finds or returns null - used to verify that something is not there
findBy - async, finds or throws
*/

const noAction = () => {
}

//region module mocks
jest.mock("./AddEmployeeForm", () => {
    return function AddEmployeeForm() {
        return (
            <div>
                Mocked employee form
            </div>
        );
    };
});
//endregion

describe('AddEmployeeFormContainer component test', () => {
    test('AddEmployeeFormContainer should render the expand button', () => {
        render(<AddEmployeeFormContainer updateList={noAction}/>);

        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(1);
        expect(buttons[0]).toHaveTextContent('Add employee');
    });

    test('AddEmployeeFormContainer should not render the form by default', () => {
        render(<AddEmployeeFormContainer updateList={noAction}/>);

        expect(screen.queryByText("Mocked employee form")).toBeFalsy();
    });
});

describe('AddEmployeeFormContainer expand button interaction test', () => {
    test('AddEmployeeFormContainer should show the form when expanded', () => {
        render(<AddEmployeeFormContainer updateList={noAction}/>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(screen.getByText("Mocked employee form")).toBeTruthy();
    });

    test('AddEmployeeFormContainer should hide the button when expanded', () => {
        render(<AddEmployeeFormContainer updateList={noAction}/>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(screen.queryByText("Add employee")).toBeFalsy();
    });
});
