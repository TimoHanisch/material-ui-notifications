import React from 'react';
import PropTypes from 'prop-types';

import NotificationHeader from './NotificationHeader';
import NotificationContent from './NotificationContent';
import NotificationActionContent from './NotificationActionContent';
import Close from 'material-ui/svg-icons/navigation/close';
import { Transition } from 'react-transition-group';
import { Avatar, IconButton, Paper, List, ListItem } from 'material-ui';

export default class Notification extends React.Component {

    static propTypes = {

        headerLabel: PropTypes.string.isRequired,

        onClose: PropTypes.func.isRequired,

        title: PropTypes.string.isRequired,

        text: PropTypes.string.isRequired,

        avatar: PropTypes.node,

        actions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })),

        icon: PropTypes.node,

        primaryColor: PropTypes.string,

        secondaryHeaderLabel: PropTypes.string,

        timestamp: PropTypes.string,

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
        const { actions, actionContent, avatar, icon, headerLabel, onClose, primaryColor, secondaryHeaderLabel, timestamp, style, title, text, } = this.props;
        return (
            <Paper style={{ ...Notification.STYLE.container, ...style }}>
                <NotificationHeader
                    headerLabel={headerLabel}
                    icon={icon}
                    onClose={onClose}
                    primaryColor={primaryColor}
                    secondaryHeaderLabel={secondaryHeaderLabel}
                    timestamp={timestamp}
                />
                <NotificationContent
                    avatar={avatar}
                    title={title}
                    text={text}
                />
                {
                    !!actions && (
                        <NotificationActionContent
                            actions={actions}
                            primaryColor={primaryColor}
                        />
                    )
                }
            </Paper>
        );
    }
}