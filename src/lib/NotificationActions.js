import Dispatcher from './dispatcher';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, RESET_NOTIFICATIONS } from './constants';

/**
 * Actions, which are exposed to the developer, to interact with the NotificationContainer.
 * 
 * @author Timo Hanisch <timohanisch@googlemail.com>
 * @since 0.1.0
 */
class NotificationActions {

    /**
     * Adds the given notifcation to the system so it then can be rendered 
     * in a NotifcationContainer.
     * 
     * @param {*} notification Notificaton which should be added and shown
     */
    addNotification(notification) {
        Dispatcher.dispatch({
            type: ADD_NOTIFICATION,
            data: notification,
        });
    }

    /**
     * Removes the notifcation with the given id from the store.
     * 
     * @param {Number} notificationId Id of the notification to be removed
     */
    removeNotification(notificationId) {
        Dispatcher.dispatch({
            type: REMOVE_NOTIFICATION,
            data: notificationId,
        });
    }

    /**
     * Removes all notifications from the internal store.
     */
    resetNotifications() {
        Dispatcher.dispatch({
            type: RESET_NOTIFICATIONS
        });
    }
}

export default new NotificationActions();