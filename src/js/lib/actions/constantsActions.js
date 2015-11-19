
import constants from '../state/constants';

const {
  CONSTANTS_ADD
} = constants.toJS();

export function constantsAdd(data) {
  return {
    type: CONSTANTS_ADD,
    data
  }
};
