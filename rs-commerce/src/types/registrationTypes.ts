type TypesOfInput = 'email' | 'password' | 'text' | 'date';
export type TypesOfAddress = 'billitg' | 'shipping';

export type InputType = {
  htmlFor: string;
  title: string;
  type: TypesOfInput;
  placeholder: string;
  smallSize?: boolean;
};

export type InputProps = {
  input: InputType;
  errorClassName?: string;
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
