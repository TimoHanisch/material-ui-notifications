import { Dispatcher } from 'flux';

class NotificationDispatcher extends Dispatcher {
	constructor() {
		super();
	}

	dispatch(data) {
		super.dispatch(data);
	}
}

export default new NotificationDispatcher();