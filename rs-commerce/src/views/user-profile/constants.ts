import { ROUTE_PATH } from 'constants/constants';

export const userProfileBreadcrumbList = [
  {
    name: 'Main',
    link: ROUTE_PATH.main,
  },
  {
    name: 'Profile',
    link: null,
  },
];

export const profileBreadcrumbList = [
  {
    name: 'Main',
    link: ROUTE_PATH.main,
  },
  {
    name: 'Profile',
    link: ROUTE_PATH.profile,
  },
];

export const changeNameBreadcrumbList = [
  ...profileBreadcrumbList,
  {
    name: 'Edit personal information',
    link: null,
  },
];

export const changePasswordBreadcrumbList = [
  ...profileBreadcrumbList,
  {
    name: 'Edit password',
    link: null,
  },
];

export const changeAddressBreadcrumbList = [
  ...profileBreadcrumbList,
  {
    name: 'Edit address',
    link: null,
  },
];

export const addAddressBreadcrumbList = [
  ...profileBreadcrumbList,
  {
    name: 'Add address',
    link: null,
  },
];
