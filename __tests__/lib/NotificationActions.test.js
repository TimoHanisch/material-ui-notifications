import NotificationActions from '../../src/lib/NotificationActions';
import Dispatcher from '../../src/lib/dispatcher';
import {
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    RESET_NOTIFICATIONS,
} from '../../src/lib/constants';

jest.mock('./dispatcher', () => ({
    dispatch: jest.fn(),
}));

describe('Test NotificationActions', () => {
    beforeEach(() => {
        Dispatcher.dispatch.mockClear();
    });

    test('addNotification should dispatch ADD_NOTIFICATION and the passed notification', () => {
        const notification = {
            label: 'test',
        };
        NotificationActions.addNotification(notification);

        expect(Dispatcher.dispatch).toHaveBeenCalledTimes(1);
        expect(Dispatcher.dispatch).toHaveBeenCalledWith({
            type: ADD_NOTIFICATION,
            data: notification,
        });
    });

    test('removeNotification should dispatch REMOVE_NOTIFICATION and the passed notificationId', () => {
        const notificationId = 0;
        NotificationActions.removeNotification(notificationId);

        expect(Dispatcher.dispatch).toHaveBeenCalledTimes(1);
        expect(Dispatcher.dispatch).toHaveBeenCalledWith({
            type: REMOVE_NOTIFICATION,
            data: notificationId,
        });
    });

    test('resetNotifications should dispatch RESET_NOTIFICATIONS', () => {
        NotificationActions.resetNotifications();

        expect(Dispatcher.dispatch).toHaveBeenCalledTimes(1);
        expect(Dispatcher.dispatch).toHaveBeenCalledWith({
            type: RESET_NOTIFICATIONS,
        });
    });
});
