import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
        backgroundColor: grey[200],
    },
    button: {
        minWidth: null, // We do not want the default width of 88px
    },
    buttonLabel: {
        padding: '0 8px 0 8px',
    },
};

/**
 * The action area of a notifaction as shown in https://material.io/guidelines/patterns/notifications.html#notifications-anatomy-of-a-notification
 * and adjusted for the web.
 *
 * @author Timo Hanisch <timohanisch@googlemail.com>
 * @since 0.1.0
 */
const NotificationActionArea = ({ actions, theme, primaryColor }) => {
    const styles = {
        // Inline style which is relies on dynamic information
        buttonLabel: {
            color: primaryColor || theme.palette.text.primary,
            ...STYLES.buttonLabel,
        },
    };
    return (
        <div style={STYLES.container}>
            {actions.map((action, index) => (
                <Button
                    key={`nAction_${index}`}
                    style={
                        index > 0
                            ? { ...STYLES.button, marginLeft: 8 }
                            : STYLES.button
                    }
                    onClick={action.onClick}
                >
                    <span style={styles.buttonLabel}>{action.label}</span>
                </Button>
            ))}
        </div>
    );
};

NotificationActionArea.propTypes = {
    /* An array of action objects which are shown as flat buttons at the bottom of the notification */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })
    ).isRequired,

    /* By default notifications use the primary1color defined for the material-ui theme for the header and actions. */
    primaryColor: PropTypes.string,
};

NotificationActionArea.defaultProps = {
    primaryColor: '',
};

// Use Material-UI HOC to get access to the used primary color
export default withTheme()(NotificationActionArea);
