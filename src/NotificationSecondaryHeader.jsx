import React from 'react';
import PropTypes from 'prop-types';
import grey from '@material-ui/core/colors/grey';

const STYLES = {
    secondary: {
        color: grey[600],
        fontSize: 14,
    },
    separator: {
        color: grey[600],
        fontSize: 14,
        fontWeight: 600,
        margin: '0 4px 0 4px',
    },
};

const NotificationSecondaryHeader = ({ label }) => (
    <React.Fragment>
        <span style={STYLES.separator}>·</span>
        <span style={STYLES.secondary}>{label}</span>
    </React.Fragment>
);

NotificationSecondaryHeader.propTypes = {
    /* A text which can be used to indicate additional meta information */
    label: PropTypes.string.isRequired,
};

export default NotificationSecondaryHeader;
