// noinspection DuplicatedCode

import React from "react";
import {render, screen} from "@testing-library/react";
import EmployeeList from "./EmployeeList";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {EmployeeListItemProps} from "./EmployeeListItem";

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

//region module mocks
jest.mock("./EmployeeListItem", () => {
    return function EmployeeListItem(props: EmployeeListItemProps) {
        return (
            <div>
                Mocked employee: {props.employee.id}. <span>{props.employee.name}</span>
            </div>
        );
    };
});

jest.mock("./addEmployeeForm/AddEmployeeFormContainer", () => {
    return function AddEmployeeFormContainer() {
        return (
            <button>Add employee</button>
        );
    };
});
//endregion

//region method mocks
jest.spyOn(console, 'error');
//endregion

describe('EmployeeList fetching test', () => {
    test('EmployeeList should start the loader at start', async () => {
        render(<EmployeeList/>);
        expect(screen.getByText('Loading...')).toBeTruthy();
    });

    test('EmployeeList should render AddEmployeeFormContainer after having loaded', async () => {
        render(<EmployeeList/>);

        expect(await screen.findByText("Employee list")).toBeTruthy();
    });

    test('EmployeeList should render 3 list items after having loaded', async () => {
        render(<EmployeeList/>);

        expect(await screen.findByText("Bates Parker")).toBeTruthy();
        expect(await screen.findByText("Hobbs Sullivan")).toBeTruthy();
        expect(await screen.findByText("Alisha Stephenson")).toBeTruthy();
    });

    test('EmployeeList should hide the loader after having loaded', async () => {
        render(<EmployeeList/>);

        expect(await screen.findByText("Bates Parker")).toBeTruthy();
        expect(screen.queryByText("Loading...")).toBeFalsy();
    });

    test('EmployeeList should handle empty response', async () => {
        server.use(
            rest.get('*/employees', (request, response, ctx) => {
                return response(ctx.json([]));
            })
        );
        const {container} = render(<EmployeeList/>);

        expect(await screen.findByText("Employee list")).toBeTruthy();
        expect(container).toMatchInlineSnapshot(`
    <div>
      <h1>
        Employee list
      </h1>
      <button>
        Add employee
      </button>
    </div>
  `)
    })
});

describe('EmployeeList error handling test', () => {
    const changeServerToThrowError = () => {
        server.use(
            rest.get('*/employees', (request, response, ctx) => {
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

    test('EmployeeList shouldn\'t crash on error', async () => {
        changeServerToThrowError();
        const {container} = render(<EmployeeList/>);

        expect(await screen.findByText("Employee list")).toBeTruthy();
        expect(container).toMatchInlineSnapshot(`
    <div>
      <h1>
        Employee list
      </h1>
      <button>
        Add employee
      </button>
    </div>
  `)
    });

    test('EmployeeList should log the error status code on error', async () => {
        changeServerToThrowError();
        expect((console.error as any).mock.calls.length).toBe(0);
        const {container} = render(<EmployeeList/>);

        expect(await screen.findByText("Employee list")).toBeTruthy();
        expect(container).toMatchInlineSnapshot(`
    <div>
      <h1>
        Employee list
      </h1>
      <button>
        Add employee
      </button>
    </div>
  `)
        expect((console.error as any).mock.calls.length).toBe(1);
        expect((console.error as any).mock.calls[0][0]).toContain("Error");

        expect((console.error as any).mock.calls[0][0]).toContain("500");
    });
});
