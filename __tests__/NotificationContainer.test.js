import React from 'react';
import { shallow } from 'enzyme';
import { Avatar } from '@material-ui/icons';
import { Call } from '@material-ui/icons';
import NotificationContainer from '../src/NotificationContainer';
import Store from '../src/lib/store';
import NotificationActions from '../src/lib/NotificationActions';

jest.mock('../src/lib/store');

describe('Test NotificationContainer', () => {
    beforeEach(() => {
        Store.notifications = [];
    });

    test('by default, the NotificationContainer is a FlipMove component, with default values set', () => {
        const wrapper = shallow(<NotificationContainer />).dive();

        expect(wrapper.is('FlipMove')).toBeTruthy();
        expect(wrapper.props().appearAnimation).toBe(
            NotificationContainer.defaultProps.appearAnimation
        );
        expect(wrapper.props().duration).toBe(
            NotificationContainer.defaultProps.duration
        );
        expect(wrapper.props().easing).toBe(
            NotificationContainer.defaultProps.easing
        );
        expect(wrapper.props().enterAnimation).toBe(
            NotificationContainer.defaultProps.enterAnimation
        );
        expect(wrapper.props().leaveAnimation).toBe(
            NotificationContainer.defaultProps.leaveAnimation
        );
    });

    test('if notifications exist in the store, they should be rendered as Notification components', () => {
        Store.notifications = [
            {
                id: 1,
                headerLabel: '1',
                title: '1',
                text: 'text',
                avatar: <Avatar />,
                actions: [{ label: 'action', onClick: jest.fn() }],
                icon: <Call />,
                primaryColor: 'red',
                secondaryHeaderLabel: 'secondary',
                timestamp: '12:00',
            },
            {
                id: 2,
                headerLabel: '2',
                title: '2',
                text: 'text',
                avatar: <Avatar />,
                actions: [{ label: 'action', onClick: jest.fn() }],
                icon: <Call />,
                primaryColor: 'blue',
                secondaryHeaderLabel: 'secondary',
                timestamp: '13:00',
            },
        ];
        const wrapper = shallow(<NotificationContainer />).dive();

        expect(wrapper.find('Notification')).toHaveLength(2);
        Store.notifications.forEach((notification, index) => {
            const component = wrapper.childAt(index);
            expect(component.props().notificationId).toBe(notification.id);
            expect(component.props().headerLabel).toBe(
                notification.headerLabel
            );
            expect(component.props().title).toBe(notification.title);
            expect(component.props().text).toBe(notification.text);
            expect(component.props().avatar).toBe(notification.avatar);
            expect(component.props().actions).toBe(notification.actions);
            expect(component.props().icon).toBe(notification.icon);
            expect(component.props().primaryColor).toBe(
                notification.primaryColor
            );
            expect(component.props().secondaryHeaderLabel).toBe(
                notification.secondaryHeaderLabel
            );
            expect(component.props().timestamp).toBe(notification.timestamp);
        });
    });

    test('if _onNotificationClose is called, NotificationActions.removeNotification should be called with the given id', () => {
        const removeNotificationSpy = jest
            .spyOn(NotificationActions, 'removeNotification')
            .mockImplementation();
        const id = 1;
        const wrapper = shallow(<NotificationContainer />);

        wrapper.instance()._onNotificationClose(id);

        expect(removeNotificationSpy).toHaveBeenCalledTimes(1);
        expect(removeNotificationSpy).toHaveBeenCalledWith(id);

        removeNotificationSpy.mockRestore();
    });

    test('if _onStoreUpdate is called, forceUpdate should be called', () => {
        const updateSpy = jest
            .spyOn(NotificationContainer.prototype, 'forceUpdate')
            .mockImplementation();
        const wrapper = shallow(<NotificationContainer />);

        wrapper.instance()._onStoreUpdate();

        expect(updateSpy).toHaveBeenCalledTimes(1);

        updateSpy.mockRestore();
    });

    test('if position is top-left, _builContainerStyle should return a stlye with left + top position ', () => {
        const wrapper = shallow(<NotificationContainer position="top-left" />);
        const result = wrapper.instance()._buildContainerStyle();

        expect(result.bottom).toBeFalsy();
        expect(result.right).toBeFalsy();
        expect(result.top).toBe(32);
        expect(result.left).toBe(32);
    });

    test('if position is top-right, _builContainerStyle should return a stlye with right + top position ', () => {
        const wrapper = shallow(<NotificationContainer position="top-right" />);
        const result = wrapper.instance()._buildContainerStyle();

        expect(result.bottom).toBeFalsy();
        expect(result.right).toBe(32);
        expect(result.top).toBe(32);
        expect(result.left).toBeFalsy();
    });

    test('if position is bottom-right, _builContainerStyle should return a stlye with right + bottom position ', () => {
        const wrapper = shallow(
            <NotificationContainer position="bottom-right" />
        );
        const result = wrapper.instance()._buildContainerStyle();

        expect(result.bottom).toBe(32);
        expect(result.right).toBe(32);
        expect(result.top).toBeFalsy();
        expect(result.left).toBeFalsy();
    });

    test('if position is bottom-left, _builContainerStyle should return a stlye with left + bottom position ', () => {
        const wrapper = shallow(
            <NotificationContainer position="bottom-left" />
        );
        const result = wrapper.instance()._buildContainerStyle();

        expect(result.bottom).toBe(32);
        expect(result.right).toBeFalsy();
        expect(result.top).toBeFalsy();
        expect(result.left).toBe(32);
    });
});
