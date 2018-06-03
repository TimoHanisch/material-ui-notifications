import React from 'react';
import { shallow } from 'enzyme';
import NotificationTimestamp from '../src/NotificationTimestamp';

describe('Test NotificationTimestamp', () => {
    test('should render 2 spans with the first containing a separator and the second one the timestamp', () => {
        const timestamp = new Date().toLocaleDateString();
        const wrapper = shallow(
            <NotificationTimestamp timestamp={timestamp} />
        );

        expect(wrapper.childAt(0).is('span')).toBeTruthy();
        expect(wrapper.childAt(0).text()).toBe('·');
        expect(wrapper.childAt(1).is('span')).toBeTruthy();
        expect(wrapper.childAt(1).text()).toBe(timestamp);
    });
});
