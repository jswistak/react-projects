import React from "react";
import {render, screen} from "@testing-library/react";
import Loader from "./Loader";

/*
getBy - finds or throws error - for standard use
queryBy - finds or returns null - used to verify that something is not there
findBy - async, finds or throws
*/

describe('Loader label test', () => {
    test('Loader should present default label when loading', () => {
        render(<Loader loading={true}/>);
        expect(screen.getByText('Loading...')).toBeTruthy();
    });

    test('Loader shouldn\'t present default label when not loading', () => {
        render(<Loader loading={false}/>);
        expect(screen.queryByText('Loading...')).toBeFalsy();
    });

    test('Loader should present label from property when given one and loading', () => {
        render(<Loader loading={true} label={'label'}/>);
        expect(screen.getByText('label...')).toBeTruthy();
    });

    test('Loader shouldn\'t present label from property when given one and not loading', () => {
        render(<Loader loading={false} label={'label'}/>);
        expect(screen.queryByText('label...')).toBeFalsy();
    });

    test('Default label should be replaced if given another one', () => {
        render(<Loader loading={true} label={'label'}/>);
        expect(screen.getByText('label...')).toBeTruthy();
        expect(screen.queryByText('Loading...')).toBeFalsy();
    });

});

describe('Loader children test', () => {
    const component = <div>Loader child</div>

    test('Loader shouldn\'t present its children when loading', () => {
        render(<Loader loading={true}>{component}</Loader>);

        expect(screen.queryByText('Loader child')).toBeFalsy();
    });

    test('Loader shouldn present its children when not loading', () => {
        render(<Loader loading={false}>{component}</Loader>);

        expect(screen.getByText('Loader child')).toBeTruthy();
    });
});

describe('Loader snapshot tests', () => {
    test('Loader should match inline snapshot', () => {
        const {container} = render(<Loader loading={true}/>);
        expect(container).toMatchInlineSnapshot(`
    <div>
      Loading...
    </div>
  `)
    });

    test('App with mocked List should match snapshot', () => {
        const component = <div>Loader child</div>

        const {container} = render(<Loader loading={false}>{component}</Loader>);
        expect(container).toMatchSnapshot();
    })
});