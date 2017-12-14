import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { grey600 } from 'material-ui/styles/colors';
import { IconButton } from 'material-ui';
import Close from 'material-ui/svg-icons/navigation/close';

class NotificationHeader extends React.PureComponent {

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
            fontSize: 12,
        },
        separator: {
            color: grey600,
            fontSize: 12,
            fontWeight: 600,
            margin: '0 4px 0 4px'
        },
        timestamp: {
            color: grey600,
            fontSize: 12,
            marginRight: 8,
        }
    };

    static propTypes = {

        headerLabel: PropTypes.string.isRequired,

        onClose: PropTypes.func.isRequired,

        icon: PropTypes.node,

        timestamp: PropTypes.string,

        secondaryHeaderLabel: PropTypes.string,

        primaryColor: PropTypes.string,
    };

    static defaultProps = {
        icon: null,
        primaryColor: '',
        secondaryHeaderLabel: '',
        timestamp: '',
    };

    render() {
        const { icon, headerLabel, timestamp, secondaryHeaderLabel, muiTheme, primaryColor, onClose } = this.props;
        const styles = {
            headerLabel: {
                color: primaryColor || muiTheme.palette.primary1Color,
                marginLeft: icon ? 8 : 0,
            },
        };
        const iconColor = primaryColor || muiTheme.palette.primary1Color;
        return (
            <div style={NotificationHeader.STYLES.container}>
                <div style={NotificationHeader.STYLES.information}>
                    {!!icon && React.cloneElement(icon, { color: iconColor, style: NotificationHeader.STYLES.icon })}
                    <span style={{ ...NotificationHeader.STYLES.header, ...styles.headerLabel }}>{headerLabel}</span>
                    {
                        !!secondaryHeaderLabel && (
                            <React.Fragment>
                                <span style={NotificationHeader.STYLES.separator}>·</span>
                                <span style={NotificationHeader.STYLES.secondary}>{secondaryHeaderLabel}</span>
                            </React.Fragment>
                        )
                    }
                    {
                        !!timestamp && (
                            <React.Fragment>
                                <span style={NotificationHeader.STYLES.separator}>·</span>
                                <span style={NotificationHeader.STYLES.timestamp}>{timestamp}</span>
                            </React.Fragment>
                        )
                    }
                </div>
                <IconButton
                    onClick={onClose}
                    iconStyle={NotificationHeader.STYLES.closeButtonIcon}
                    style={NotificationHeader.STYLES.closeButton}
                >
                    <Close color={primaryColor || muiTheme.palette.primary1Color} />
                </IconButton>
            </div>
        );
    }
}
export default muiThemeable()(NotificationHeader);