import apiRootWithAnonymousSessionFlow from 'SDK/apiRootWithAnonymousSessionFlow';
import { CustomerParametersType, RegistrationCustomerType, ActionDefaultAddress } from './types';

export const createCustomer = async (body: RegistrationCustomerType) =>
  apiRootWithAnonymousSessionFlow()
    .customers()
    .post({
      body,
    })
    .execute();

export const getAddresses = async (customerID: string) =>
  apiRootWithAnonymousSessionFlow().customers().withId({ ID: customerID }).get().execute();

export const addBillingAddress = async (customerID: string, version: number, addressId: string) =>
  apiRootWithAnonymousSessionFlow()
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addBillingAddressId',
            addressId,
          },
        ],
      },
    })
    .execute();

export const addShippingAddress = async (customerID: string, version: number, addressId: string) =>
  apiRootWithAnonymousSessionFlow()
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addShippingAddressId',
            addressId,
          },
        ],
      },
    })
    .execute();

export const addDefaultAddress = async (
  customerID: string,
  version: number,
  addressId: string,
  action: ActionDefaultAddress,
) =>
  apiRootWithAnonymousSessionFlow()
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version,
        actions: [
          {
            action,
            addressId,
          },
        ],
      },
    })
    .execute();

export const addCustomerParameters = async (
  customerID: string,

  objParameters: CustomerParametersType,
  version: number = 1,
) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    shippingCity,
    shippingCountry,
    shippingPostCode,
    shippingStreet,
    billingCity,
    billingCountry,
    billingPostCode,
    billingStreet,
  } = objParameters;

  return apiRootWithAnonymousSessionFlow()
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'setFirstName',
            firstName,
          },
          {
            action: 'setLastName',
            lastName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth,
          },
          {
            action: 'addAddress',
            address: {
              key: 'billing',
              streetName: shippingStreet,
              postalCode: shippingPostCode,
              city: shippingCity,
              country: shippingCountry,
              externalId: 'shipping',
            },
          },
          {
            action: 'addAddress',
            address: {
              key: 'shipping',
              streetName: billingStreet,
              postalCode: billingPostCode,
              city: billingCity,
              country: billingCountry,
              externalId: 'billing',
            },
          },
        ],
      },
    })
    .execute();
};
