import { TypeFields } from 'types/registrationTypes';

const regExpObj = {
  firstName: /[A-Z]+/i,
  lastName: /[A-Z]+/i,
  billingCity: /[A-Z]+/i,
  shippingCity: /[A-Z]+/i,
  billingStreet: /^\S/,
  shippingStreet: /^\S/,
  email: /^[A-Za-z0-9-_.]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/i,
  password: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{8,}/,
  billingPostCode: /(\d{6})|(\d{5})/,
  shippingPostCode: /(\d{6})|(\d{5})/,
};

const errorMsgObj = {
  dateOfBirth: 'We only sell to those over 13 years old',
  firstName: 'Use at least 1 latin letter',
  lastName: 'Use at least 1 latin letter',
  billingCity: 'Use at least 1 latin letter',
  shippingCity: 'Use at least 1 latin letter',
  billingStreet: 'Use at least 1 symbol',
  shippingStreet: 'Use at least 1 symbol',
  email: 'Use correct email',
  password:
    'Use at least 1 number, 1 big and 1 small latin letters 1 of  the next symbols !@#$%^&*. Minimal length - 8 symbols',
  billingPostCode: 'Use correct post index',
  shippingPostCode: 'Use correct post index',
};

export function checkRegistrationField(
  data: string,
  setErrorContent: React.Dispatch<React.SetStateAction<string>>,
  nameField: TypeFields,
): boolean {
  if (!regExpObj[nameField].test(data)) {
    setErrorContent(errorMsgObj[nameField]);
    return false;
  }
  setErrorContent('');
  return true;
}

export function checkData(
  data: string,
  setErrorContent: React.Dispatch<React.SetStateAction<string>>,
  nameField: TypeFields,
): boolean {
  const limitData = new Date();
  limitData.setFullYear(limitData.getFullYear() - 13);

  const birthdayData = new Date(data);

  if (birthdayData <= limitData) {
    setErrorContent('');
    return true;
  }
  setErrorContent(errorMsgObj[nameField]);
  return false;
}
