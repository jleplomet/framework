
import constants from '../state/constants';

const {
  SETTINGS_UPDATE
} = constants.toJS();

export function settingsUpdate(data) {
  return {
    type: SETTINGS_UPDATE,
    data
  }
};
