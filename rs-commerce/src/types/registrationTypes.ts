type TypesOfInput = 'email' | 'password' | 'text' | 'date';
export type TypesOfAddress = 'billitg' | 'shipping';
export type HtmlForType =
  | 'billingCity'
  | 'dateOfBirth'
  | 'firstName'
  | 'lastName'
  | 'shippingCity'
  | 'billingStreet'
  | 'shippingStreet'
  | 'email'
  | 'password'
  | 'billingPostCode'
  | 'shippingPostCode'
  | 'billingCountry'
  | 'shippingCountry';

export type InputType = {
  htmlFor: HtmlForType;
  title: string;
  type: TypesOfInput;
  placeholder: string;
  smallSize?: boolean;
};

export type InputProps = {
  input: InputType;
};

export type AddressType = {
  typeComponent: TypesOfAddress;
};

export type CheckboxRegistrationType = {
  content: string;
  htmlFor: string;
};

export enum TypeFields {
  /*     dateOfBirth = 'dateOfBirth', */
  firstName = 'firstName',
  lastName = 'lastName',
  billingCity = 'billingCity',
  shippingCity = 'shippingCity',
  billingStreet = 'billingStreet',
  shippingStreet = 'shippingStreet',
  email = 'email',
  password = 'password',
  billingPostCode = 'billingPostCode',
  shippingPostCode = 'shippingPostCode',
}

export type TypeCountry = 'shippingCountry' | 'billingCountry';

export type RegistrationFormSliceState = {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  billingCity: string;
  shippingCity: string;
  billingStreet: string;
  shippingStreet: string;
  email: string;
  password: string;
  billingPostCode: string;
  shippingPostCode: string;
  billingCountry: string;
  shippingCountry: string;
};

export enum DispatchObj {
  billingCity = 'setBillingCity',
  dateOfBirth = 'setDateOfBirth',
  firstName = 'setFirstName',
  lastName = 'setLastName',
  shippingCity = 'setShippingCity',
  billingStreet = 'setBillingStreet',
  shippingStreet = 'setShippingStreet',
  email = 'setEmail',
  password = 'setPassword',
  billingPostCode = 'setBillingPostCode',
  shippingPostCode = 'setShippingPostCode',
  billingCountry = 'setBillingCountry',
  shippingCountry = 'setShippingCountry',
}
