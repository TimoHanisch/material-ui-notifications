import React from 'react';
import PropTypes from 'prop-types';
import grey from '@material-ui/core/colors/grey';

const STYLES = {
    timestamp: {
        color: grey[600],
        fontSize: 12,
        marginRight: 8,
    },
    separator: {
        color: grey[600],
        fontSize: 14,
        fontWeight: 600,
        margin: '0 4px 0 4px',
    },
};

const NotificationTimestamp = ({ timestamp }) => (
    <React.Fragment>
        <span style={STYLES.separator}>·</span>
        <span style={STYLES.timestamp}>{timestamp}</span>
    </React.Fragment>
);

NotificationTimestamp.propTypes = {
    /* A timestamp which is rendered as a secondary text besides the header */
    timestamp: PropTypes.string.isRequired,
};

export default NotificationTimestamp;
