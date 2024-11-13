// validations.ts

export const validateUsername = (value: string): string => {
  return /^[a-zA-Z][a-zA-Z0-9]{3,11}$/.test(value)
    ? ''
    : '条件: 英数字4～12桁';
};

export const validatePassword = (value: string): string => {
  if (value === '' || !/^[a-zA-Z0-9@()[\].!]{8,32}$/.test(value)) {
    return '条件: 英数字記号@()[].! 8～32桁';
  }
  else if (!/^[a-zA-Z0-9@()[\].!]+$/.test(value)) {
    return '使用できない記号が含まれています';
  }
  else {
    return '';
  }
};

export const validateEmail = (value: string): string => {
  return /^[\w\.\-]+@[\w\-]+\.[\w\-]{2,}$/.test(value)
    ? ''
    : 'メールアドレスが正しくありません';
};

export const validatePhone = (phone1: string, phone2: string, phone3: string): string => {
  return /^\d{3}$/.test(phone1) && /^\d{4}$/.test(phone2) && /^\d{4}$/.test(phone3)
    ? ''
    : '電話番号が正しくありません';
};

export const validatePasswordConfirm = (password: string, confirm: string): string => {
  return password === confirm ? '' : 'パスワードが一致しません';
};
