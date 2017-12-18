# API Reference

Material-UI Notifications offers multiple components and classes enabling the usage of material design conform notifications
for the web.

## Notification

**[React-Component]**

The notification component is the base component used to render notifications.

### `headerLabel`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `String` | `undefined` | `true`|

The title of the application/notification in the notification header.

### `onClose`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `Function` | `undefined` | `true`|

Callback function which is called when the user clicks on the closing button.
The created click `Event` is passed to the function.

### `title`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `String` | `undefined` | `true`|

Main title for the notification which is rendered into the content body of the notification.

### `text`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `String` | `undefined` | `true`|

Text shown in the content body below the title.

### `avatar`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `Node` | `null` | `false`|

An avatar which should be added to the notification. May indiciate the creator of the notification to the user.
This should be a Material-UI `Avatar`.

`<Notification ... avatar={<Avatar src="/path/to/img"/>} ... />`

### `actions`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `Array<Object>` | `undefined` | `false`|

An array of action objects which are shown as flat buttons at the bottom of the notification. These action
objects should look like the following example.

```js
{
    label: String,
    onClick: Function,
}
```

The `label` is used as the button text and `onClick` is called after clicking on the corresponding button.

### `icon`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `Node` | `null` | `false`|

An icon to be shown on the most left side of the notification header. 
Should be a Material-UI icon as shown [here](http://www.material-ui.com/#/components/font-icon) or [here](http://www.material-ui.com/#/components/svg-icon).

### `primaryColor`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `String` | `''` | `false`|

By default notifications use the primary1color defined for the Material-UI theme for the header and actions.

Notifications can use custom primary colors for example to create unique impressions for different notification types.

### `secondaryHeaderLabel`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `String` | `''` | `false`|

A string which is additionally drawn besides the [`headerLabel`](#headerlabel). May be used to deliver additional meta information to
the user.

### `timestamp`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `String` | `''` | `false`|

Indiciating the time when the notification was created.

### `style`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `Object` | `{}` | `false`|

Inline styles which are applied to the notification container. May contain the styles supported by React.

## NotificationContainer

**[React-Component]**

### `appearAnimation`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `Object`, `String`, `Boolean` | `{from:{opacity: 0.25}, to: {opacity: 1}}` | `false`|

Control the appear animation that runs when the notification mounts. Works identically to [`enterAnimation`](#enteranimation) below, but only fires on the initial notification.

### `duration`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `Number` | `350` | `false`|

The length, in milliseconds, that the transition of notification ought to take.

### `easing`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `String` | `cubic-bezier(0.23, 1, 0.32, 1)` | `false`|

Any valid CSS3 timing function (eg. `linear`, `ease-in`, `cubic-bezier(1, 0, 0, 1)`).

### `enterAnimation`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `Object`, `String`, `Boolean` | `{from:{opacity: 0.25}, to: {opacity: 1}}` | `false`|

Control the onEnter animation that runs when new notifications are added to the `NotifcationContainer`.

Accepts several types:

**String:** You can enter one of the following presets to select that as your enter animation:
  * `elevator`
  * `fade`
  * `accordionVertical`
  * `accordionHorizontal`
  * `none`

**Boolean:** You can enter `false` to disable the enter animation, or `true` to select the default enter animation.

**Object: (default)** For fully granular control, you can pass in an object that contains the styles you'd like to animate.
It requires two keys: `from` and `to`. Each key holds an object of CSS properties. You can supply any valid camelCase CSS properties, and the notification will transition between the two, over the course of the specified `duration`.

Example:

```jsx
const customEnterAnimation = {
  from: { transform: 'scale(0.5, 1)' },
  to:   { transform: 'scale(1, 1)' }
};

<Notification 
    {...}
    enterAnimation={customEnterAnimation}
    {...}
/>
```

It is recommended that you stick to hardware-accelerated CSS properties for optimal performance: transform and opacity.

---

### `leaveAnimation`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `Object`, `String`, `Boolean` | `{from:{opacity: 1}, to: {opacity: 0}}` | `false`|

Control the onLeave animation that runs when notifications are removed from the `NotificationContainer`.

See [`enterAnimation`](#enteranimation) for how to implement a leave animation. 

### `position`

| **Accepted Types:** | **Default Value** | **Required** |
|---------------------|-------------------|-------------------|
|  `String` | `'top-right'` | `false`|

The position of the container relativly to the browser view.

**String:** You can enter one of the following presets to select that as your position:
  * `top-left`
  * `top-right` (default)
  * `bottom-left`
  * `bottom-right`


## NotificationActions

**[Class]**

The notification actions offer some functionalities to interact with the mounted [`NotificationContainer`](#notificationcontainer).

### `addNotification(notification: Object)`

Adds the given notifcation to the system so it then can be rendered in the mounted [`NotificationContainer`](#notificationcontainer).

The passed notification can have the following form. All properties are passed through to a created [`Notification`](#notification) object 
with the exception of `autoHide`.

```js
{
    actions: Array<Object>,
    autoHide: Number, // Time in milliseconds after which the notification should automatically be hidden
    avatar: JSX.Node,
    headerLabel: String,
    icon: JSX.Node,
    onClose: Function,
    primaryColor: String,
    secondaryHeaderLabel: String,
    text: String,
    timestamp: String,
    title: String,
}
```


### `removeNotification(id: Number)`

Removes the notifcation with the given id from the store.

### `resetNotifications()`

Removes all notifications from the internal store.