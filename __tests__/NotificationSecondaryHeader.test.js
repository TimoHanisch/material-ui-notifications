import React from 'react';
import { shallow } from 'enzyme';
import NotificationSecondaryHeader from '../src/NotificationSecondaryHeader';

describe('Test NotificationSecondaryHeader', () => {
    test('should render 2 spans with the first containing a separator and the second one the label', () => {
        const label = 'A test label';
        const wrapper = shallow(<NotificationSecondaryHeader label={label} />);

        expect(wrapper.childAt(0).is('span')).toBeTruthy();
        expect(wrapper.childAt(0).text()).toBe('·');
        expect(wrapper.childAt(1).is('span')).toBeTruthy();
        expect(wrapper.childAt(1).text()).toBe(label);
    });
});
