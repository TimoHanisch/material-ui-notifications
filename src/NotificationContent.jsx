import React from 'react';
import PropTypes from 'prop-types';
import { grey600 } from 'material-ui/styles/colors';

export default class NotificationContent extends React.PureComponent {

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
        },
        title: {
            fontSize: 15,
            fontWeight: 600,
        },
    };

    static propTypes = {
        text: PropTypes.string.isRequired,

        title: PropTypes.string.isRequired,

        avatar: PropTypes.node,
    };

    static defaultProps = {
        avatar: null,
    };

    render() {
        const { avatar, text, title } = this.props;
        return (
            <div style={NotificationContent.STYLES.container}>
                <div style={NotificationContent.STYLES.textContainer}>
                    <span style={NotificationContent.STYLES.title}>{title}</span>
                    <span style={NotificationContent.STYLES.text}>{text}</span>
                </div>
                {
                    !!avatar && React.cloneElement(avatar, { style: NotificationContent.STYLES.avatar })
                }
            </div>
        );
    }
}