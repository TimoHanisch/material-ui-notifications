import React from 'react';
import PropTypes from 'prop-types';
import { grey600 } from 'material-ui/styles/colors';

/**
 * The content area of a notification as shown in https://material.io/guidelines/patterns/notifications.html#notifications-anatomy-of-a-notification.
 * 
 * @author Timo Hanisch <timohanisch@googlemail.com>
 * @since 0.1.0
 */
export default class NotificationContentArea extends React.PureComponent {

    static propTypes = {
        /* Content text to be rendered in the notification */
        text: PropTypes.string.isRequired,

        /* Title of the content rendered in the notificaton */
        title: PropTypes.string.isRequired,

        /* An avatar (or large icon) to be shown on the right side of a notification */
        avatar: PropTypes.node,
    };

    static defaultProps = {
        avatar: null,
    };

    static STYLES = {
        avatar: {
            marginLeft: 8,
        },
        container: {
            padding: '8px 16px 16px 16px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        text: {
            fontSize: 14,
            color: grey600,
            marginTop: 2,
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 392,
        },
        title: {
            fontSize: 15,
            fontWeight: 600,
        },
    };

    render() {
        const { avatar, text, title } = this.props;
        return (
            <div style={NotificationContentArea.STYLES.container}>
                <div style={NotificationContentArea.STYLES.textContainer}>
                    <span style={NotificationContentArea.STYLES.title}>{title}</span>
                    <span style={NotificationContentArea.STYLES.text}>{text}</span>
                </div>
                {
                    // If no avatar was passed we do not render anything otherwise we render the avatar
                    // and apply our styles to it
                    !!avatar && React.cloneElement(avatar, { style: NotificationContentArea.STYLES.avatar })
                }
            </div>
        );
    }
}