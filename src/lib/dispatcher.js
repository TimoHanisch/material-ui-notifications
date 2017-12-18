import { Dispatcher } from 'flux';

/**
 * An implementation of the flux dispatcher used
 * as a singleton for the notifications, so that
 * we do not have to use the applications own
 * dispatcher.
 */
class NotificationDispatcher extends Dispatcher {
	constructor() {
		super();
	}

	dispatch(data) {
		super.dispatch(data);
	}
}

export default new NotificationDispatcher();