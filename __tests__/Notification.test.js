import React from 'react';
import { shallow } from 'enzyme';
import Notification from '../src/Notification';
import { Avatar } from '@material-ui/core';
import { Email } from '@material-ui/icons';

describe('Test Notification component', () => {
    const onCloseMock = jest.fn();
    beforeEach(() => {
        onCloseMock.mockClear();
    });

    test('if all required parameters are passed Notification should be a Paper', () => {
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
            />
        ).dive();

        expect(wrapper.is('Paper')).toBeTruthy();
    });

    test('if all required parameters are passed Notification should contain a NotificationHeaderArea at top', () => {
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
            />
        );
        const notificationHeader = wrapper.childAt(0).dive();

        expect(notificationHeader.is('NotificationHeaderArea')).toBeTruthy();
        expect(notificationHeader.props().headerLabel).toBe('Test');
        expect(notificationHeader.props().icon).toBeNull();
        expect(notificationHeader.props().onClose).toBe(
            wrapper.instance()._onClose
        );
        expect(notificationHeader.props().primaryColor).toBe('');
        expect(notificationHeader.props().secondaryHeaderLabel).toBe(
            Notification.defaultProps.secondaryHeaderLabel
        );
        expect(notificationHeader.props().timestamp).toBe(
            Notification.defaultProps.timestamp
        );
    });

    test('if all required parameters are passed Notification should contain a NotificationContentArea at the bottom', () => {
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
            />
        );
        const notificationContentArea = wrapper.childAt(1);

        expect(
            notificationContentArea.is('NotificationContentArea')
        ).toBeTruthy();
        expect(notificationContentArea.props().avatar).toBeNull();
        expect(notificationContentArea.props().title).toBe('Test Title');
        expect(notificationContentArea.props().text).toBe('Test Text');
    });

    test('if all required parameters are passed Notification should not contain a NotificationActionArea', () => {
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
            />
        );

        expect(wrapper.find('NotificationActionArea')).toHaveLength(0);
    });

    test('if secondaryHeaderLabel is set, it should be passed to NotificationHeaderArea', () => {
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
                secondaryHeaderLabel="Secondary Header"
            />
        );
        const notificationHeader = wrapper.childAt(0).dive();

        expect(notificationHeader.props().secondaryHeaderLabel).toBe(
            'Secondary Header'
        );
    });

    test('if primaryColor is set, it should be passed to NotificationHeaderArea', () => {
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
                primaryColor="#00ff00"
            />
        );
        const notificationHeader = wrapper.childAt(0).dive();

        expect(notificationHeader.props().primaryColor).toBe('#00ff00');
    });

    test('if timestamp is set, it should be passed to NotificationHeaderArea', () => {
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
                timestamp="01.01.1970 00:00"
            />
        );
        const notificationHeader = wrapper.childAt(0).dive();

        expect(notificationHeader.props().timestamp).toBe('01.01.1970 00:00');
    });

    test('if an icon is set, it should be passed to NotificationHeaderArea', () => {
        const icon = <Email />;
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
                icon={icon}
            />
        );
        const notificationHeader = wrapper.childAt(0).dive();

        expect(notificationHeader.props().icon).toBe(icon);
    });

    test('if avatar is set, it should be passed to NotificationContentArea', () => {
        const avatar = <Avatar size={64} />;
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
                avatar={avatar}
            />
        );
        const notificationContentArea = wrapper.childAt(1);

        expect(notificationContentArea.props().avatar).toBe(avatar);
    });

    test('if actions are passed, NotificationActionArea should be rendered', () => {
        const actionsMock = [{ label: 'Action1', onClick: jest.fn() }];
        const wrapper = shallow(
            <Notification
                actions={actionsMock}
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
                primaryColor="red"
            />
        );
        const notificationActionArea = wrapper.childAt(2).dive();

        expect(
            notificationActionArea.is('NotificationActionArea')
        ).toBeTruthy();
        expect(notificationActionArea.props().actions).toBe(actionsMock);
        expect(notificationActionArea.props().primaryColor).toBe('red');
    });

    test('if onClose is triggered and not notificationId is passed, the passed onClose function should be called with the event', () => {
        const eventMock = {
            target: null,
            type: 'click',
        };
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                title="Test Title"
                text="Test Text"
            />
        );

        wrapper.instance()._onClose(eventMock);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
        expect(onCloseMock).toHaveBeenCalledWith(eventMock);
    });

    test('if onClose is triggered and notificationId is passed, the passed onClose function should be called with the id', () => {
        const eventMock = {
            target: null,
            type: 'click',
        };
        const wrapper = shallow(
            <Notification
                headerLabel="Test"
                onClose={onCloseMock}
                notificationId={1}
                title="Test Title"
                text="Test Text"
            />
        );

        wrapper.instance()._onClose(eventMock);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
        expect(onCloseMock).toHaveBeenCalledWith(1);
    });
});
