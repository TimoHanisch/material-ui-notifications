# Material-UI Notifications

[![https://nodei.co/npm/material-ui-notifications.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/material-ui-notifications.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/material-ui-notifications)

Material-UI Notification offers components and functionality to use a web version of the Material Desing notifications as seen
in the [Documentation](https://material.io/guidelines/patterns/notifications.html#notifications-anatomy-of-a-notification).

To implement the components we use [Material-UI](https://github.com/mui-org/material-ui) (< v1.0.0) and [React Flip Move](https://github.com/joshwcomeau/react-flip-move).

# Installation

To use all components you have to add `material-ui-notifications` to your dependencies.

**Yarn**
```bash
> yarn add material-ui-notifications
```

**npm**
```bash
> npm install -S material-ui-notifications
```
# Examples

**Simple usage of a notification**

```jsx
<Notification
    headerLabel="Mail"
    onClose={e => { this.setState({ showNotification: false }); }}
    title="Timo Hanisch"
    text="Yeah this seems like a pretty good idea!"
 />
```

**Simple usage of a notification container**

```jsx
import { NotificationActions, NotifcationContainer } from 'material-ui-notifications';
...
<div>
    <NotificationContainer />
    <button onClick={
        e => { 
            NotificationActions.addNotification(
                {
                    headerLabel: "Mail",
                    secondaryHeaderLabel: "timohanisch@googlemail.com",
                    timestamp: "Now",
                    primaryColor: "#ff0000",
                    title: "Timo Hanisch",
                    text: "Yeah this seems like a pretty good idea!",
                }
            ); 
        }}
    >
    Click me
    </button>
 </div>
...
```

# Demo

To run the demo clone the repository and then run following commands. We use [Storybook](https://github.com/storybooks/storybook) to test 

```bash
> yarn

> yarn storybook
```

# Documentation

The documentation for all components and functionalities can be found [here](/documentation/api.md)

# License
The Project is Licensed under the [MIT License](/LICENSE)
