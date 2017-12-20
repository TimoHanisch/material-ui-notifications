import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { grey600 } from 'material-ui/styles/colors';
import { IconButton } from 'material-ui';
import Close from 'material-ui/svg-icons/navigation/close';

/**
 * Implementation of the web adjusted notification header as described at https://material.io/guidelines/patterns/notifications.html#notifications-anatomy-of-a-notification.
 * 
 * @author Timo Hanisch <timohanisch@googlemail.com>
 * @since 0.1.0
 */
class NotificationHeaderArea extends React.PureComponent {

    static propTypes = {
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

    static defaultProps = {
        icon: null,
        primaryColor: '',
        secondaryHeaderLabel: '',
        timestamp: '',
    };

    static STYLES = {
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
            alignItems: 'center'
        },
        header: {
            fontSize: 14,
        },
        secondary: {
            color: grey600,
            fontSize: 14,
        },
        separator: {
            color: grey600,
            fontSize: 14,
            fontWeight: 600,
            margin: '0 4px 0 4px'
        },
        timestamp: {
            color: grey600,
            fontSize: 12,
            marginRight: 8,
        }
    };

    render() {
        const { icon, headerLabel, timestamp, secondaryHeaderLabel, muiTheme, primaryColor, onClose } = this.props;
        // Since the header relies on dynamic information for styling we create the style object inside the render
        const styles = {
            headerLabel: {
                color: primaryColor || muiTheme.palette.primary1Color,
                marginLeft: icon ? 8 : 0,
            },
        };
        // Check if the notificaton should have another primary color
        const color = primaryColor || muiTheme.palette.primary1Color;
        // For secondary and meta text tags we use React.Fragment which is part of React
        // since 16.2. These tags are not part of the final DOM, but allow us to
        // return multiple tags from a since statement without cluttering the DOM
        // by using div containers.
        return (
            <div style={NotificationHeaderArea.STYLES.container}>
                <div style={NotificationHeaderArea.STYLES.information}>
                    {
                        // Check if the icon should be rendered and set color and styles
                        !!icon && React.cloneElement(icon, { color, style: NotificationHeaderArea.STYLES.icon })
                    }
                    <span style={{ ...NotificationHeaderArea.STYLES.header, ...styles.headerLabel }}>{headerLabel}</span>
                    {
                        // Check if the secondary header should be rendered and add a separator if it 
                        // should be rendered
                        !!secondaryHeaderLabel && (
                            <React.Fragment>
                                <span style={NotificationHeaderArea.STYLES.separator}>·</span>
                                <span style={NotificationHeaderArea.STYLES.secondary}>{secondaryHeaderLabel}</span>
                            </React.Fragment>
                        )
                    }
                    {
                        // Same as for the secondary header
                        !!timestamp && (
                            <React.Fragment>
                                <span style={NotificationHeaderArea.STYLES.separator}>·</span>
                                <span style={NotificationHeaderArea.STYLES.timestamp}>{timestamp}</span>
                            </React.Fragment>
                        )
                    }
                </div>
                {/* Button used to close the notifcation */}
                <IconButton
                    onClick={onClose}
                    iconStyle={NotificationHeaderArea.STYLES.closeButtonIcon}
                    style={NotificationHeaderArea.STYLES.closeButton}
                >
                    <Close color={color} />
                </IconButton>
            </div>
        );
    }
}
export default muiThemeable()(NotificationHeaderArea);