import Dispatcher from './dispatcher';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, RESET_NOTIFICATIONS } from './constants';

class NotificationActions {
    addNotification(notification) {
        Dispatcher.dispatch({
            type: ADD_NOTIFICATION,
            data: notification,
        });
    }

    removeNotification(notificationId) {
        Dispatcher.dispatch({
            type: REMOVE_NOTIFICATION,
            data: notificationId,
        });
    }

    resetNotifications() {
        Dispatcher.dispatch({
            type: RESET_NOTIFICATIONS
        });
    }
}

export default new NotificationActions();