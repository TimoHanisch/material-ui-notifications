import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, RESET_NOTIFICATIONS, DISPATCH_UPDATE } from './constants';

/**
 * Flux store internally used to manage notifications for material-ui-notifications.
 * 
 * @author Timo Hanisch <timohanisch@googlemail.com>
 * @since 0.1.0
 */
class Store extends EventEmitter {

    constructor() {
        super();
        // Ref token returned by Flux
        this._token = Dispatcher.register(this._handleActions);
        // List of all active notifications
        this._notifications = [];
        // List of all timer refs used for auto hide notifcations
        this._timerRefs = [];
        // Auto increasing id used for added notifications
        this._uniqueId = 0;
    }

    /**
     * Returns the flux token for this store.
     * Note: Since material-ui-notifications uses its own dispatcher
     * this token might not be usefull at all outside of this library.
     * 
     * @public
     * @returns {String} the token created by flux
     */
    get token() {
        return this._token;
    }

    /**
     * Returns the list of all active notifications.
     * 
     * @public
     * @returns {Array<*>}
     */
    get notifications() {
        return this._notifications;
    }

    /**
     * Generates a unique id for a notification. Unique in this store
     * not globally unique.
     * 
     * @private
     */
    _generateId() {
        return this._uniqueId++;
    }

    /**
     * Adds the given notification to the internal notification list and creates
     * a unique id for it. If the notification is an auto hide notification
     * a timer for it is created and added to the internal ref list.
     * Finally a dispatch update is emitted.
     * 
     * @param {*} notification 
     * @private
     */
    _addNotification(notification) {
        const { autoHide, ...rest } = notification;
        const tmpNotification = {
            ...rest,
            id: this._generateId(),
        };
        this._notifications = [
            tmpNotification,
            ...this._notifications,
        ];
        if (autoHide) {
            // Add an object with the notification id and timer ref to the the timer refs
            // list, so we are later properly able to remove it from the timer ref list
            this._timerRefs = [
                ...this._timerRefs,
                {
                    id: tmpNotification.id,
                    ref: setTimeout(() => { this._removeNotification(tmpNotification.id) }, autoHide),
                },
            ];
        }
        this.emit(DISPATCH_UPDATE);
    }

    /**
     * Removes the notification with the given id from the internal notification list.
     * 
     * Finally a dispatch update is emitted.
     * 
     * @param {Number} notificationId 
     * @private
     */
    _removeNotification(notificationId) {
        this._notifications = this._notifications.filter(notification => notification.id !== notificationId);
        this._timerRefs = this._timerRefs.filter(refObj => refObj.id !== notificationId);
        this.emit(DISPATCH_UPDATE);
    }

    /**
     * Stops all timers, removes all notifications from the internal notification list
     * and emits an update event.
     * 
     * @private
     */
    _resetNotifications() {
        this._timerRefs.forEach(refObj => {
            clearTimeout(refObj.ref);
        });
        this._timerRefs = [];
        this._notifications = [];
        this.emit(DISPATCH_UPDATE);
    }

    /**
     * Handle all incoming flux actions dispatched by our dispatcher implementation.
     * 
     * @param {*} action  
     * @private
     */
    _handleActions = (action) => {
        switch (action.type) {
            case ADD_NOTIFICATION: {
                this._addNotification(action.data);
                break;
            }
            case REMOVE_NOTIFICATION: {
                this._removeNotification(action.data);
                break;
            }
            case RESET_NOTIFICATIONS: {
                this._resetNotifications();
                break;
            }
        }
    };
}

export default new Store();