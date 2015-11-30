
export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';

export function settingsUpdate(data) {
  return {
    type: SETTINGS_UPDATE,
    data
  }
};
