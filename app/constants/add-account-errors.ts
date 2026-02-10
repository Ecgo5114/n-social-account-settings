/**
 * 新增帳號時可能發生的錯誤類型與對應提示
 */
export type AddAccountErrorType =
  | 'auth-cancelled'
  | 'account-already-exists'
  | 'account-limit'
  | 'network-timeout'
  | 'platform-specific'
  | 'app-config'
  | 'general';

export const ADD_ACCOUNT_ERROR_OPTIONS: Array<{
  value: AddAccountErrorType;
  label: string;
  message: string;
}> = [
  {
    value: 'auth-cancelled',
    label: 'Authorization cancelled',
    message: 'The connection was cancelled before completion. Try connecting again to continue.',
  },
  {
    value: 'account-already-exists',
    label: 'Account already connected',
    message: 'This account is linked to your workspace. We\'ve highlighted it in the list below.',
  },
  {
    value: 'account-limit',
    label: 'Account limit reached',
    message: 'Disconnect an existing account to free a slot, then add this one.',
  },
  {
    value: 'network-timeout',
    label: 'Connection timed out',
    message: 'The request took too long. Check your internet connection and try again.',
  },
  {
    value: 'platform-specific',
    label: 'Account linked elsewhere',
    message: 'This account is connected to another workspace. Disconnect it there first, then add it here.',
  },
  {
    value: 'app-config',
    label: 'Something went wrong',
    message: 'We\'re having a temporary issue. Please try again in a few minutes.',
  },
  {
    value: 'general',
    label: 'Connection failed',
    message: 'We couldn\'t complete the connection. Try again—if it persists, contact support.',
  },
];
