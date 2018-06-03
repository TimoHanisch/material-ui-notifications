import React from 'react';
import { shallow } from 'enzyme';
import { Avatar } from '@material-ui/core';
import { Email } from '@material-ui/icons';
import NotificationHeaderArea from '../src/NotificationHeaderArea';

describe('Test NotificationHeaderArea', () => {
    const closeMock = jest.fn();
    beforeEach(() => {
        closeMock.mockClear();
    });
    test('should render as a div by default', () => {
        const wrapper = shallow(
            <NotificationHeaderArea headerLabel="Test" onClose={closeMock} />
        ).dive();

        expect(wrapper.is('div')).toBeTruthy();
    });

    test('should render a div container and an IconButton by default', () => {
        const wrapper = shallow(
            <NotificationHeaderArea headerLabel="Test" onClose={closeMock} />
        ).dive();

        expect(wrapper.childAt(0).is('div')).toBeTruthy();
        expect(
            wrapper
                .childAt(1)
                .dive()
                .is('IconButton')
        ).toBeTruthy();
    });

    test('should render the headerLabel inside a span in the div container', () => {
        const header = 'test';
        const wrapper = shallow(
            <NotificationHeaderArea headerLabel={header} onClose={closeMock} />
        ).dive();

        expect(
            wrapper
                .childAt(0)
                .childAt(0)
                .is('span')
        ).toBeTruthy();
        expect(
            wrapper
                .childAt(0)
                .childAt(0)
                .text()
        ).toBe(header);
    });

    test('should render icon before header label, when an icon is passed', () => {
        const header = 'test';
        const wrapper = shallow(
            <NotificationHeaderArea
                headerLabel={header}
                onClose={closeMock}
                icon={<Email />}
            />
        ).dive();

        const divContainer = wrapper.childAt(0);

        expect(
            divContainer
                .childAt(0)
                .dive()
                .is('Icon')
        ).toBeTruthy();
        expect(divContainer.childAt(1).text()).toBe(header);
    });

    test('should render a NotificationSecondaryHeader if a secondary header is passed', () => {
        const secondaryHeader = 'Secondary';
        const wrapper = shallow(
            <NotificationHeaderArea
                headerLabel="Test"
                onClose={closeMock}
                secondaryHeaderLabel={secondaryHeader}
            />
        ).dive();

        expect(wrapper.find('NotificationSecondaryHeader')).toHaveLength(1);
        expect(
            wrapper
                .find('NotificationSecondaryHeader')
                .at(0)
                .props().label
        ).toBe(secondaryHeader);
    });

    test('should render a NotificationTimestamp if a timestamp is passed', () => {
        const timestamp = new Date().toLocaleDateString();
        const wrapper = shallow(
            <NotificationHeaderArea
                headerLabel="Test"
                onClose={closeMock}
                timestamp={timestamp}
            />
        ).dive();

        expect(wrapper.find('NotificationTimestamp')).toHaveLength(1);
        expect(
            wrapper
                .find('NotificationTimestamp')
                .at(0)
                .props().timestamp
        ).toBe(timestamp);
    });

    test('should trigger passed onClose function if IconButton is clicked', () => {
        const wrapper = shallow(
            <NotificationHeaderArea headerLabel="Test" onClose={closeMock} />
        ).dive();

        wrapper.childAt(1).simulate('click');

        expect(closeMock).toHaveBeenCalledTimes(1);
    });
});
