import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, RESET_NOTIFICATIONS, DISPATCH_UPDATE } from './constants';

class Store extends EventEmitter {

    constructor() {
        super();
        this._token = Dispatcher.register(this.handleActions);
        this._notifications = [];
        this._timerRefs = [];
        this._uniqueId = 0;
    }

    get token() {
        return this._token;
    }

    get notifications() {
        return this._notifications;
    }

    _generateId() {
        return this._uniqueId++;
    }

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
            this._timerRefs = [
                ...this._timerRefs,
                setTimeout(() => { this._removeNotification(tmpNotification.id) }, autoHide)
            ]
        }
        this.emit(DISPATCH_UPDATE);
    }

    _removeNotification(notificationId) {
        this._notifications = this._notifications.filter(notification => notification.id !== notificationId);
        this.emit(DISPATCH_UPDATE);
    }

    _resetNotifications() {
        this._notifications = [];
        this.emit(DISPATCH_UPDATE);
    }

    handleActions = (action) => {
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