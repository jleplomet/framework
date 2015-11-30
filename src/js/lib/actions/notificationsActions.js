
export const NOTIFICATION_ADD = 'NOTIFICATION_ADD';

export function notificationsAdd(data) {
  return {
    type: NOTIFICATION_ADD,
    data
  }
};
