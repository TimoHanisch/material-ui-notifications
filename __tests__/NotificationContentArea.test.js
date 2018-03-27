import React from 'react';
import { shallow } from 'enzyme';
import { Avatar } from 'material-ui';
import NotificationContentArea from '../src/NotificationContentArea';

describe('Test NotificationContentArea', () => {
    test('by default a div should be rendered', () => {
        const wrapper = shallow(
            <NotificationContentArea text="text" title="title" />
        );

        expect(wrapper.is('div')).toBeTruthy();
    });

    test('should contain div with two spans for title and text', () => {
        const wrapper = shallow(
            <NotificationContentArea text="text" title="title" />
        );

        const titleTextContainer = wrapper.childAt(0);
        expect(titleTextContainer.is('div')).toBeTruthy();

        expect(titleTextContainer.childAt(0).is('span')).toBeTruthy();
        expect(titleTextContainer.childAt(0).text()).toBe('title');
        expect(titleTextContainer.childAt(1).is('span')).toBeTruthy();
        expect(titleTextContainer.childAt(1).text()).toBe('text');
    });

    test('if an avatar is passed, React.cloneElement should be called on it, to inject our own style', () => {
        const cloneElementSpy = jest.spyOn(React, 'cloneElement');
        const avatar = <Avatar />;
        const wrapper = shallow(
            <NotificationContentArea
                avatar={avatar}
                text="text"
                title="title"
            />
        );

        expect(wrapper.find('Avatar')).toHaveLength(1);

        expect(cloneElementSpy).toHaveBeenCalledTimes(1);
        expect(cloneElementSpy).toHaveBeenCalledWith(avatar, {
            style: {
                marginLeft: 8,
            },
        });
    });
});
