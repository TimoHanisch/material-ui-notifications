import React from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import Store from './lib/store';
import NotificationActions from './lib/NotificationActions';
import FlipMove from 'react-flip-move';
import { DISPATCH_UPDATE } from './lib/constants';

/**
 * The notification container is used for rendering notifications in your web
 * application. All notifications added to the system will be children of this container.
 * Additionally it handles all notification animations with the help
 * of react-flip-move (https://github.com/joshwcomeau/react-flip-move). Documentation for
 * prop types is taken from react-flip-move, since they are only passed to the flip move component.
 * 
 * The container itself is a fixed div container with a z-index of 1200.
 * 
 * @author Timo Hanisch <timohanisch@googlemail.com>
 * @since 0.1.0
 */
export default class NotificationContainer extends React.Component {

    /**
     * The default enter/appear animation used by notifications added to
     * the notification container.
     * 
     * @private
     */
    static _enterAnimation = {
        from: {
            opacity: 0.25,
        },
        to: {
            opacity: 1,
        },
    };

    /**
     * The default leave animation used by notifications added to
     * the notification container.
     * 
     * @private
     */
    static _leaveAnimation = {
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0,
        },
    };

    static propTypes = {
        /**
         * Control the appear animation that runs when the component mounts. Control the appear 
         * animation that runs when the component mounts. Works identically to enterAnimation below, 
         * but only fires on the initial children.
         */
        appearAnimation: PropTypes.oneOfType([
            PropTypes.shape({
                from: PropTypes.object,
                to: PropTypes.object,
            }),
            PropTypes.oneOf([
                'elevator',
                'fade',
                'accordionVertical',
                'accordionHorizontal',
                'none',
            ]),
            PropTypes.bool,
        ]),

        /**
         * The length, in milliseconds, that the transition ought to take.
         */
        duration: PropTypes.number,

        /**
         * Any valid CSS3 timing function (eg. "linear", "ease-in", "cubic-bezier(1, 0, 0, 1)").
         */
        easing: PropTypes.string,

        /**
         * Control the onEnter animation that runs when new notifcations are added to the container.
         */
        enterAnimation: PropTypes.oneOfType([
            PropTypes.shape({
                from: PropTypes.object,
                to: PropTypes.object,
            }),
            PropTypes.oneOf([
                'elevator',
                'fade',
                'accordionVertical',
                'accordionHorizontal',
                'none',
            ]),
            PropTypes.bool,
        ]),

        /**
         * Control the onLeave animation that runs when new notifications are removed from the container.
         */
        leaveAnimation: PropTypes.oneOfType([
            PropTypes.shape({
                from: PropTypes.object,
                to: PropTypes.object,
            }),
            PropTypes.oneOf([
                'elevator',
                'fade',
                'accordionVertical',
                'accordionHorizontal',
                'none',
            ]),
            PropTypes.bool,
        ]),

        /* The position of the container relativly to the browser view */
        position: PropTypes.oneOf([
            'top-left',
            'top-right',
            'bottom-right',
            'bottom-left',
        ]),
    }

    static defaultProps = {
        appearAnimation: NotificationContainer._enterAnimation,
        duration: 350,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        enterAnimation: NotificationContainer._enterAnimation,
        leaveAnimation: NotificationContainer._leaveAnimation,
        position: 'top-right',
    };

    static STYLE = {
        container: {
            position: 'fixed',
            zIndex: 1200,
            minWidth: 320,
        },
    };

    componentWillMount() {
        Store.on(DISPATCH_UPDATE, this._onStoreUpdate);
    }

    componentWillUnmount() {
        // When the container unmounts we want all old notifications to be cleared.
        // Currently only one NotificationContainer at a time is supported.
        NotificationActions.resetNotifications();
        Store.removeListener(DISPATCH_UPDATE, this._onStoreUpdate);
    }

    /**
     * Callback for the close button.
     * 
     * @param {Number} notificationId Id of the notification to be removed
     * @private
     */
    _onNotificationClose = (notificationId) => {
        NotificationActions.removeNotification(notificationId);
    };


    /**
     * Called when the internal notification store is updated. I.e. a notifcation is added
     * or removed.
     * 
     * @private
     */
    _onStoreUpdate = () => {
        this.forceUpdate();
    };

    /**
     * Builds the notficiaton container style with help of the passed position property.
     * 
     * @private
     * @returns a style object used for the notification container itself.
     */
    _builContainerStyle() {
        const { position } = this.props;
        // Depending on the chosen position we use a margin of 32 pixels from the
        // corresponding side.
        return {
            ...NotificationContainer.STYLE.container,
            bottom: position.indexOf('bottom') !== -1 && 32,
            left: position.indexOf('left') !== -1 && 32,
            right: position.indexOf('right') !== -1 && 32,
            top: position.indexOf('top') !== -1 && 32,
        };
    }

    render() {
        const { appearAnimation, duration, easing, enterAnimation, leaveAnimation } = this.props;
        // Retrieve the notifcations from the internal store
        const notifications = Store.notifications;
        return (
            <FlipMove
                appearAnimation={appearAnimation}
                duration={duration}
                easing={easing}
                enterAnimation={enterAnimation}
                leaveAnimation={leaveAnimation}
                style={this._builContainerStyle()}
            >
                {
                    notifications.map((notification, index) => (
                        <Notification
                            key={notification.id}
                            headerLabel={notification.headerLabel}
                            onClose={() => this._onNotificationClose(notification.id)}
                            title={notification.title}
                            text={notification.text}
                            avatar={notification.avatar}
                            actions={notification.actions}
                            icon={notification.icon}
                            primaryColor={notification.primaryColor}
                            secondaryHeaderLabel={notification.secondaryHeaderLabel}
                            timestamp={notification.timestamp}
                            style={{ marginTop: index > 0 ? 16 : 0, ...notification.style }}
                        />
                    ))
                }
            </FlipMove>
        );
    }
}