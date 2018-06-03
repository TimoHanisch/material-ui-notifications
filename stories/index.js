import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
    NotificationContainer,
    Notification,
    NotificationActions,
} from '../src/index';
import { Avatar, Button } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { Close, Email } from '@material-ui/icons';
import { MuiThemeProvider } from '@material-ui/core/styles';

storiesOf('Notification', module)
    .add('Simple Notification', () => (
        <div style={{ position: 'fixed' }}>
            <MuiThemeProvider>
                <Notification
                    headerLabel="Mail"
                    onClose={() => {}}
                    title="Timo Hanisch"
                    text="Yeah this seems like a pretty good idea!"
                />
            </MuiThemeProvider>
        </div>
    ))
    .add('Extended Notification', () => (
        <div style={{ position: 'fixed' }}>
            <MuiThemeProvider>
                <Notification
                    avatar={
                        <Avatar src="http://archive.jsonline.com/images.ashx?file=42269712_homer(2).jpg&resize=" />
                    }
                    icon={<Email />}
                    headerLabel="Mail"
                    secondaryHeaderLabel="timohanisch@googlemail.com"
                    timestamp="Now"
                    primaryColor={red[500]}
                    onClose={() => {}}
                    title="Timo Hanisch"
                    text="Yeah this seems like a pretty good idea!"
                />
            </MuiThemeProvider>
        </div>
    ))
    .add('Notification with Actions', () => (
        <div style={{ position: 'fixed' }}>
            <MuiThemeProvider>
                <Notification
                    actions={[
                        {
                            label: 'Reply',
                            onClick: e => console.info('Lets reply'),
                        },
                        {
                            label: 'Archive',
                            onClick: e => console.info('Lets archive'),
                        },
                    ]}
                    avatar={
                        <Avatar src="http://archive.jsonline.com/images.ashx?file=42269712_homer(2).jpg&resize=" />
                    }
                    icon={<Email />}
                    headerLabel="Mail"
                    secondaryHeaderLabel="timohanisch@googlemail.com"
                    timestamp="11.12.2017"
                    primaryColor={red[500]}
                    onClose={() => {}}
                    title="Timo Hanisch"
                    text="Yeah this seems like a pretty good idea!"
                />
            </MuiThemeProvider>
        </div>
    ));

storiesOf('NotificationContainer', module)
    .add('Simple Notification', () => (
        <MuiThemeProvider>
            <div>
                <NotificationContainer />
                <Button
                    variant="raised"
                    onClick={() => {
                        NotificationActions.addNotification({
                            headerLabel: 'Mail',
                            title: `Timo Hanisch`,
                            text: 'Yeah this seems like a pretty good idea!',
                        });
                    }}
                >
                    Create Notification
                </Button>
            </div>
        </MuiThemeProvider>
    ))
    .add('Extended Notification', () => (
        <MuiThemeProvider>
            <div>
                <NotificationContainer />
                <Button
                    variant="raised"
                    label=""
                    onClick={() => {
                        NotificationActions.addNotification({
                            avatar: (
                                <Avatar src="http://archive.jsonline.com/images.ashx?file=42269712_homer(2).jpg&resize=" />
                            ),
                            icon: <Email />,
                            headerLabel: 'Mail',
                            secondaryHeaderLabel: 'timohanisch@googlemail.com',
                            timestamp: 'Now',
                            primaryColor: red[500],
                            title: 'Timo Hanisch',
                            text: 'Yeah this seems like a pretty good idea!',
                        });
                    }}
                >
                    Create Notification
                </Button>
            </div>
        </MuiThemeProvider>
    ))
    .add('Extended Notification with auto hide', () => (
        <MuiThemeProvider>
            <div>
                <NotificationContainer />
                <Button
                    onClick={() => {
                        NotificationActions.addNotification({
                            autoHide: 5000,
                            avatar: (
                                <Avatar src="http://archive.jsonline.com/images.ashx?file=42269712_homer(2).jpg&resize=" />
                            ),
                            icon: <Email />,
                            headerLabel: 'Mail',
                            secondaryHeaderLabel: 'timohanisch@googlemail.com',
                            timestamp: 'Now',
                            primaryColor: red[500],
                            title: 'Timo Hanisch',
                            text: 'Yeah this seems like a pretty good idea!',
                        });
                    }}
                >
                    Create Notification
                </Button>
            </div>
        </MuiThemeProvider>
    ));
