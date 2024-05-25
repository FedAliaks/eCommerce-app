import { InputProfileType, ProfileComponentType } from 'components/profile-component/types';

export const inputArrayPersonal: InputProfileType[] = [
  {
    title: 'First name',
    id: 'first-name',
    isSizeSmall: true,
    type: 'text',
    value: 'value',
  },
  {
    title: 'Last name',
    id: 'last-name',
    isSizeSmall: true,
    type: 'text',
    value: 'value',
  },
  {
    title: 'Date of birth',
    id: 'date-of-birth',
    isSizeSmall: false,
    type: 'data',
    value: '2000-01-05',
  },
];

export const inputArrayShippingAddress: InputProfileType[] = [
  {
    title: 'Country',
    id: 'country-ship',
    isSizeSmall: true,
    type: 'text',
    value: 'value',
  },
  {
    title: 'Post code',
    id: 'post-code-ship',
    isSizeSmall: true,
    type: 'text',
    value: 'value',
  },
  {
    title: 'City',
    id: 'city-ship',
    isSizeSmall: true,
    type: 'text',
    value: 'value',
  },
  {
    title: 'Street',
    id: 'street-ship',
    isSizeSmall: true,
    type: 'text',
    value: 'value',
  },
];

export const inputArrayBillingAddress: InputProfileType[] = [
  {
    title: 'Country',
    id: 'country-billing',
    isSizeSmall: true,
    type: 'text',
    value: 'value',
  },
  {
    title: 'Post code',
    id: 'post-code-billing',
    isSizeSmall: true,
    type: 'text',
    value: 'value',
  },
  {
    title: 'City',
    id: 'city-billing',
    isSizeSmall: true,
    type: 'text',
    value: 'value',
  },
  {
    title: 'Street',
    id: 'street-billing',
    isSizeSmall: true,
    type: 'text',
    value: 'value',
  },
];

export const ProfileUsersComponents: ProfileComponentType[] = [
  {
    title: 'Personal information',
    inputArray: inputArrayPersonal,
  },
  {
    title: 'Address information',
    subtitle: 'Shipping address',
    defaultAddress: true,
    inputArray: inputArrayShippingAddress,
  },
  {
    subtitle: 'Billing address',
    defaultAddress: false,
    inputArray: inputArrayBillingAddress,
  },
];
