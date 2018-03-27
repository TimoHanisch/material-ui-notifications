import NotificationActionArea from '../src/NotificationActionArea';
import React from 'react';
import { shallow } from 'enzyme';

describe('Test NotificationActionArea', () => {
    const actionsMock = [
        { label: 'action1', onClick: jest.fn() },
        { label: 'action2', onClick: jest.fn() },
    ];

    beforeEach(() => {
        actionsMock.forEach(action => {
            action.onClick.mockClear();
        });
    });

    test('by default the NotificationActionArea should be a div', () => {
        const wrapper = shallow(
            <NotificationActionArea actions={actionsMock} />
        ).dive();

        expect(wrapper.is('div')).toBeTruthy();
    });

    test('for each action a FlatButton should be rendered, with the correct label and onClick function', () => {
        const wrapper = shallow(
            <NotificationActionArea actions={actionsMock} />
        ).dive();

        expect(wrapper.children()).toHaveLength(actionsMock.length);
        const firstButton = wrapper.childAt(0);
        expect(firstButton.is('FlatButton')).toBeTruthy();
        expect(firstButton.props().label).toBe(actionsMock[0].label);
        expect(firstButton.props().onClick).toBe(actionsMock[0].onClick);

        const secondButton = wrapper.childAt(1);
        expect(secondButton.is('FlatButton')).toBeTruthy();
        expect(secondButton.props().label).toBe(actionsMock[1].label);
        expect(secondButton.props().onClick).toBe(actionsMock[1].onClick);
    });

    test('if the index of the rendered action button is > 0, marginLeft should be set to 8, otherwise maginLeft should be undefined', () => {
        const wrapper = shallow(
            <NotificationActionArea actions={actionsMock} />
        ).dive();

        expect(wrapper.childAt(0).props().style.marginLeft).toBeUndefined();
        expect(wrapper.childAt(1).props().style.marginLeft).toBe(8);
    });

    test('if a muiTheme.palette.primary1Color is set, the button label should use this color', () => {
        const muiThemMock = {
            palette: {
                primary1Color: 'blue',
            },
        };
        const wrapper = shallow(
            <NotificationActionArea
                actions={actionsMock}
                muiTheme={muiThemMock}
            />
        ).dive();

        actionsMock.forEach((e, index) => {
            expect(wrapper.childAt(index).props().labelStyle.color).toBe(
                muiThemMock.palette.primary1Color
            );
        });
    });

    test('if primaryColor and muiTheme.palette.primary1Color are set, the primaryColor should be used for the labels', () => {
        const muiThemMock = {
            palette: {
                primary1Color: 'blue',
            },
        };
        const wrapper = shallow(
            <NotificationActionArea
                actions={actionsMock}
                muiTheme={muiThemMock}
                primaryColor="red"
            />
        ).dive();

        actionsMock.forEach((e, index) => {
            expect(wrapper.childAt(index).props().labelStyle.color).toBe('red');
        });
    });

    test('if a button is clicked, the passed actions onClose function should be called', () => {
        const wrapper = shallow(
            <NotificationActionArea actions={actionsMock} />
        ).dive();

        actionsMock.forEach((e, index) => {
            wrapper.childAt(index).simulate('click');

            expect(e.onClick).toHaveBeenCalledTimes(1);
        });
    });
});
