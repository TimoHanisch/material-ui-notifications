import React from 'react';
import PropTypes from 'prop-types';

import NotificationHeaderArea from './NotificationHeaderArea';
import NotificationContentArea from './NotificationContentArea';
import NotificationActionArea from './NotificationActionArea';
import Close from 'material-ui/svg-icons/navigation/close';
import { Transition } from 'react-transition-group';
import { Avatar, IconButton, Paper, List, ListItem } from 'material-ui';

/**
 * The notificaiton implemenation for the web based on material design
 * defined at https://material.io/guidelines/patterns/notifications.html.
 * 
 * @author Timo Hanisch <timohanisch@googlemail.com>
 * @since 0.1.0
 */
export default class Notification extends React.Component {

    static propTypes = {
        /* The title of the application/notification in the notification header */
        headerLabel: PropTypes.string.isRequired,

        /* The callback function which is called when the user clicks on the closing button */
        onClose: PropTypes.func.isRequired,

        /* Main title for the notification which is rendered into the content body of the notification */
        title: PropTypes.string.isRequired,

        /* Text shown in the content body below the title */
        text: PropTypes.string.isRequired,

        /* An avatar which should be added to the notification. May indiciate the creator of the notification to the user */
        avatar: PropTypes.node,

        /* An array of action objects which are shown as flat buttons at the bottom of the notification */
        actions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })),

        /* An icon to be shown on the most left side of the notification header */
        icon: PropTypes.node,

        /* By default notifications use the primary1color defined for the material-ui theme for the header and actions */
        primaryColor: PropTypes.string,

        /* A string which is additionally drawn besides the headerLabel */
        secondaryHeaderLabel: PropTypes.string,

        /* Indiciating the time when the notification was created */
        timestamp: PropTypes.string,

        /* Inline styles which are applied to the notification container */
        style: PropTypes.object,
    };

    static defaultProps = {
        avatar: null,
        actionArea: null,
        icon: null,
        secondaryHeader: '',
        timestamp: '',
        primaryColor: '',
        style: {},
    };

    static STYLE = {
        container: {
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
        },
    };

    render() {
        const {
            actions,
            actionContent,
            avatar,
            icon,
            headerLabel,
            onClose,
            primaryColor,
            secondaryHeaderLabel,
            timestamp,
            style,
            title,
            text,
        } = this.props;
        return (
            <Paper style={{ ...Notification.STYLE.container, ...style }}>
                <NotificationHeaderArea
                    headerLabel={headerLabel}
                    icon={icon}
                    onClose={onClose}
                    primaryColor={primaryColor}
                    secondaryHeaderLabel={secondaryHeaderLabel}
                    timestamp={timestamp}
                />
                <NotificationContentArea
                    avatar={avatar}
                    title={title}
                    text={text}
                />
                {
                    // Only render actions if the actions were passed to the component
                    !!actions && (
                        <NotificationActionArea
                            actions={actions}
                            primaryColor={primaryColor}
                        />
                    )
                }
            </Paper>
        );
    }
}