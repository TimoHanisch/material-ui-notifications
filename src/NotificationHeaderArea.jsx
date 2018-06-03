import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import NotificationSecondaryHeader from './NotificationSecondaryHeader';
import NotificationTimestamp from './NotificationTimestamp';

const STYLES = {
    closeButton: {
        width: 22,
        height: 22,
        padding: 2,
    },
    closeButtonIcon: {
        width: 18,
        height: 18,
    },
    container: {
        padding: '16px 16px 0 16px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 18,
        height: 18,
    },
    information: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        fontSize: 14,
    },
};

/**
 * Implementation of the web adjusted notification header as described at https://material.io/guidelines/patterns/notifications.html#notifications-anatomy-of-a-notification.
 *
 * @author Timo Hanisch <timohanisch@googlemail.com>
 * @since 0.1.0
 */
const NotificationHeaderArea = ({
    icon,
    headerLabel,
    timestamp,
    secondaryHeaderLabel,
    theme,
    primaryColor,
    onClose,
}) => {
    // Check if the notificaton should have another primary color
    const color = primaryColor || theme.palette.text.primary;
    // Since the header relies on dynamic information for styling we create the style object inside the render
    const styles = {
        headerLabel: {
            color,
            marginLeft: icon ? 8 : 0,
        },
    };

    // For secondary and meta text tags we use React.Fragment which is part of React
    // since 16.2. These tags are not part of the final DOM, but allow us to
    // return multiple tags from a component without cluttering the DOM
    // by using div containers.
    return (
        <div style={STYLES.container}>
            <div style={STYLES.information}>
                {// Check if the icon should be rendered and set color and styles
                !!icon &&
                    React.cloneElement(icon, {
                        color,
                        style: { ...STYLES.icon, fill: color },
                    })}
                <span
                    style={{
                        ...STYLES.header,
                        ...styles.headerLabel,
                    }}
                >
                    {headerLabel}
                </span>
                {!!secondaryHeaderLabel && (
                    <NotificationSecondaryHeader label={secondaryHeaderLabel} />
                )}
                {!!timestamp && <NotificationTimestamp timestamp={timestamp} />}
            </div>
            {/* Button used to close the notifcation */}
            <IconButton onClick={onClose} style={STYLES.closeButton}>
                <Close style={{ ...STYLES.closeButtonIcon, fill: color }} />
            </IconButton>
        </div>
    );
};

NotificationHeaderArea.propTypes = {
    /* The title of the application/notification */
    headerLabel: PropTypes.string.isRequired,

    /* Function which is called when the close icon button is clicked */
    onClose: PropTypes.func.isRequired,

    /**
     * Icon shown on the left of the header. May be used to deliver unique
     * experiences with notificaitons for the user
     */
    icon: PropTypes.node,

    /* A timestamp which is rendered as a secondary text besides the header */
    timestamp: PropTypes.string,

    /* A secondary text which can be used to indicate additional meta information */
    secondaryHeaderLabel: PropTypes.string,

    /* By default notifications use the primary1color defined for the material-ui theme for the header and actions */
    primaryColor: PropTypes.string,
};

NotificationHeaderArea.defaultProps = {
    icon: null,
    primaryColor: '',
    secondaryHeaderLabel: '',
    timestamp: '',
};

export default withTheme()(NotificationHeaderArea);
