import React from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import Store from './lib/store';
import NotificationActions from './lib/NotificationActions';
import FlipMove from 'react-flip-move';
import { DISPATCH_UPDATE } from './lib/constants';

export default class NotificationContainer extends React.Component {

    static STYLE = {
        container: {
            position: 'fixed',
            zIndex: 1200,
            minWidth: 320,
        },
    };

    static _enterAnimation = {
        from: {
            opacity: 0.25,
        },
        to: {
            opacity: 1,
        },
    };

    static _leaveAnimation = {
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0,
        },
    };

    static propTypes = {
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
        duration: PropTypes.number,
        easing: PropTypes.string,
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

    componentWillMount() {
        Store.on(DISPATCH_UPDATE, this._onStoreUpdate);
    }

    componentWillUnmount() {
        NotificationActions.resetNotifications();
        Store.removeListener(DISPATCH_UPDATE, this._onStoreUpdate);
    }

    _onNotificationClose = (notificationId) => {
        NotificationActions.removeNotification(notificationId);
    };

    _onStoreUpdate = () => {
        this.forceUpdate();
    };

    _builContainerStyle() {
        const { position } = this.props;
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