
import Dispatcher from './utils/dispatcher';

const dispatcher = new Dispatcher;

export function registerForNotifications(callback) {
  return dispatcher.register(callback);
}

export function unregisterForNotifications(token) {
  dispatcher.unregister(token);
}

export function notify(type, action = {}) {
  if (!type) {
    throw new Error('You forgot to specify type');
  }

  if (!(type === 'RESIZE')) {
    console.log(
      '%c--> notification',
      'color: #020202; font-weight: bold',
      type,
      action
    );
  }

  dispatcher.dispatch({type, ...action});
}
