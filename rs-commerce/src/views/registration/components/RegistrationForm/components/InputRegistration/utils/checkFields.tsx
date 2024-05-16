import { TypeFields } from 'types/registrationTypes';

export const registrationParamsObj = {
  dateOfBirth: '',
  firstName: '',
  lastName: '',
  billingCity: '',
  shippingCity: '',
  billingStreet: '',
  shippingStreet: '',
  email: '',
  password: '',
  billingPostCode: '',
  shippingPostCode: '',
  billingCountry: '',
  shippingCountry: '',
};

const regExpObj = {
  firstName: /[A-Z]+/i,
  lastName: /[A-Z]+/i,
  billingCity: /[A-Z]+/i,
  shippingCity: /[A-Z]+/i,
  billingStreet: /^\S/,
  shippingStreet: /^\S/,
  email: /^\w+@\w+\.\w+$/,
  password: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}/,
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
  password: 'Use at least 1 number, 1 big and 1 small latin letters. Minimal length - 8 symbols',
  billingPostCode: 'Use correct post index',
  shippingPostCode: 'Use correct post index',
};

export function checkRegistrationField(
  data: string,
  setErrorContent: React.Dispatch<React.SetStateAction<string>>,
  nameField: TypeFields,
) {
  if (!regExpObj[nameField].test(data)) {
    setErrorContent(errorMsgObj[nameField]);
    registrationParamsObj[nameField] = '';
  } else {
    setErrorContent('');
    registrationParamsObj[nameField] = data;
  }
}

export function checkData(
  data: string,
  setErrorContent: React.Dispatch<React.SetStateAction<string>>,
  nameField: TypeFields,
) {
  const limitData = new Date();
  limitData.setFullYear(limitData.getFullYear() - 13);

  const birthdayData = new Date(data);

  if (birthdayData <= limitData) {
    setErrorContent('');
    registrationParamsObj[nameField] = data;
  } else {
    setErrorContent(errorMsgObj[nameField]);
    registrationParamsObj.dateOfBirth = '';
  }
}
