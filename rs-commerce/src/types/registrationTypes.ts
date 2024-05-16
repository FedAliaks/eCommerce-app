type TypesOfInput = 'email' | 'password' | 'text' | 'date';

export type InputType = {
  htmlFor: string;
  title: string;
  type: TypesOfInput;
  placeholder: string;
  smallSize?: boolean;
};

export type InputProps = {
  input: InputType;
};

export type AddressType = {
  typeComponent: 'billing' | 'shipping';
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
