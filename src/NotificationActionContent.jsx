import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { FlatButton } from 'material-ui';
import { grey200 } from 'material-ui/styles/colors';

class NotificationActionContent extends React.PureComponent {

    static propTypes = {
        actions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })).isRequired,

        primaryColor: PropTypes.string,
    };

    static defaultProps = {
        primaryColor: '',
    };

    static STYLES = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            padding: 8,
            backgroundColor: grey200,
        },
        button: {
            minWidth: null, // We do not want the default width of 88px
        },
    };

    render() {
        const { actions, muiTheme, primaryColor } = this.props;
        const styles = {
            buttonLabel: {
                color: primaryColor || muiTheme.palette.primary1Color,
                padding: '0 8px 0 8px'
            },
        };
        return (
            <div style={NotificationActionContent.STYLES.container}>
                {
                    actions.map((action, index) => (
                        <FlatButton
                            key={`nAction_${index}`}
                            label={action.label}
                            style={index > 0 ? { ...NotificationActionContent.STYLES.button, marginLeft: 8 } : NotificationActionContent.STYLES.button}
                            labelStyle={styles.buttonLabel}
                            onClick={action.onClick}
                        />
                    ))
                }
            </div>
        );
    }
}
export default muiThemeable()(NotificationActionContent);