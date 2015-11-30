
import createReducer from '../utils/createReducer';
import initialState from '../state/notifications';

import {
  NOTIFICATION_ADD
} from '../actions/notificationsActions';

const handlers = {
  [NOTIFICATION_ADD](state, action) {
    return state.merge(action.data);
  }
};

export default createReducer(initialState, handlers);
