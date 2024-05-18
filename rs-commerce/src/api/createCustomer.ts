import apiRootWithAnonymousSessionFlow from 'SDK/apiRootWithAnonymousSessionFlow';
import { CustomerParametersType, RegistrationCustomerType } from './types';

export const createCustomer = async (body: RegistrationCustomerType) =>
  apiRootWithAnonymousSessionFlow()
    .customers()
    .post({
      body,
    })
    .execute();

export const addCustomerParameters = async (
  customerID: string,

  objParameters: CustomerParametersType,
  version: number = 1,
) => {
  const {
    firstCustomerName,
    lastCustomerName,
    dateOfBirth,
    email,
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
      // The CustomerUpdate is the object within the body
      body: {
        // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
        version,
        actions: [
          {
            action: 'setFirstName',
            firstName: firstCustomerName,
          },
          {
            action: 'setLastName',
            lastName: lastCustomerName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth,
          },
          {
            action: 'addAddress',
            address: {
              key: 'billing',
              title: '',
              salutation: '',
              firstName: firstCustomerName,
              lastName: lastCustomerName,
              streetName: shippingStreet,
              streetNumber: '',
              additionalStreetInfo: '',
              postalCode: shippingPostCode,
              city: shippingCity,
              region: '',
              state: '',
              country: shippingCountry,
              company: '',
              department: '',
              building: '',
              apartment: '',
              pOBox: '',
              phone: '',
              mobile: '',
              email,
              fax: '',
              additionalAddressInfo: '',
              externalId: 'shipping',
            },
          },
          {
            action: 'addAddress',
            address: {
              key: 'shipping',
              title: '',
              salutation: '',
              firstName: firstCustomerName,
              lastName: lastCustomerName,
              streetName: billingStreet,
              streetNumber: '',
              additionalStreetInfo: '',
              postalCode: billingPostCode,
              city: billingCity,
              region: '',
              state: '',
              country: billingCountry,
              company: '',
              department: '',
              building: '',
              apartment: '',
              pOBox: '',
              phone: '',
              mobile: '',
              email,
              fax: '',
              additionalAddressInfo: '',
              externalId: 'billing',
            },
          },
        ],
      },
    })
    .execute();
};
