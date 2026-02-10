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
    label: '授權取消',
    message: 'Connection cancelled. You closed the authorization window before completing the process. Please try again.',
  },
  {
    value: 'account-already-exists',
    label: '帳號已存在',
    message: 'This account is already connected. We\'ve highlighted it for you.',
  },
  {
    value: 'account-limit',
    label: '帳號達上限',
    message: 'Account limit reached. Remove an existing account to add a new one.',
  },
  {
    value: 'network-timeout',
    label: '連線逾時',
    message: 'Connection timed out. Please check your network and try again.',
  },
  {
    value: 'platform-specific',
    label: '平台限制',
    message: 'This account is already connected to another workspace. Disconnect it first to add here.',
  },
  {
    value: 'app-config',
    label: '應用程式錯誤',
    message: "Something went wrong on our end. We're working on it. Please try again in a few minutes.",
  },
  {
    value: 'general',
    label: '一般錯誤',
    message: 'Connection failed. Please try again or contact support if the problem persists.',
  },
];
