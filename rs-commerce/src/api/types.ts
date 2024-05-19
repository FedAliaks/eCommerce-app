export type RegistrationCustomerType = {
  email: string;
  password: string;
};

export type CustomerParametersType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  billingStreet: string;
  billingCity: string;
  billingPostCode: string;
  billingCountry: string;
  shippingCity: string;
  shippingStreet: string;
  shippingPostCode: string;
  shippingCountry: string;
  defaultBillingAddress: boolean;
  defaultShippingAddress: boolean;
};

export type ActionDefaultAddress = 'setDefaultBillingAddress' | 'setDefaultShippingAddress';
