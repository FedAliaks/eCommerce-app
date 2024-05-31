import { SimpleObject } from 'types/types';

export const LOGIN_PAGE_TEXT = {
  titleForm: 'Login',
  linkRegistration: "Don't have an account yet? ",
  linkTo: 'Register',
  titleEmail: 'Email',
  idEmail: 'login-email',
  placeholderEmail: 'Enter email',
  titlePassword: 'Password',
  idPassword: 'login-password',
  placeholderPassword: 'Enter password',
  loginPageBtn: 'Submit',
};

export const EMAIL_FORM_TIPS = {
  tipsEmailEmpty: "Email can't be empty.",
  tipsEmailWhitespaces: 'Email address must not contain leading or trailing whitespace.',
  tipsEmailAmpSymbol:
    "Email address must contain an '@' symbol separating local part and domain name",
  tipsEmailLocalPart: 'Email address must contain a local part (e.g., user).',
  tipsEmailLocalPartValid:
    'Local part can contain only latin letters, digits and "-", "_", "." character.',
  tipsEmailDomain: 'Email address must contain a domain name (e.g., example.com).',
  tipsEmailDomainValid: 'Domain can contain only latin letters, digits and "-" or "." character.',
  tipsEmailFormat: 'Email address must be properly formatted (e.g., user@example.com).',
};

export const PASSWORD_FORM_TIPS = {
  tipsPasswordEmpty: "Password can't be empty.",
  tipsPasswordWhitespaces: 'Password must not contain leading or trailing whitespace.',
  tipsPasswordHasLowercase: 'Password must contain at least one lowercase latin letter (a-z).',
  tipsPasswordHasUppercase: 'Password must contain at least one uppercase latin letter (A-Z).',
  tipsPasswordHasDigit: 'Password must contain at least one digit (0-9).',
  tipsPasswordHasSpecial: 'Password must contain at least one special character (e.g., !@#$%^&*).',
  tipsPasswordHasOnlyLatin:
    'Password must contain only latin letter (A-Za-z), digit (0-9) and special character (e.g., !@#$%^&*).',
  tipsPasswordLength: 'Password must be at least 8 characters long.',
};

export const REGEXP = {
  isLocalPartValid: /^[A-Za-z0-9-_.]+$/i,
  isDomainValid: /^[A-Za-z0-9-.]+$/i,
  isEmailValid: /^[A-Za-z0-9-_.]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/i,
  hasLowercase: /[a-z]+/,
  hasUppercase: /[A-Z]+/,
  hasDigit: /[0-9]+/,
  hasSpecial: /[!@#$%^&*]+/,
  hasOnlyLatin: /^[A-Za-z0-9!@#$%^&*]+$/,
  minPasswordLength: 8,
};

export const ROUTE_PATH = {
  main: '/',
  login: '/login',
  registration: '/registration',
  catalog: '/catalog',
  catalogCategory: '/catalog/:category',
};

export const LOCAL_STORAGE_TOKEN = 'hurricane_access_token';

export const LOCAL_STORAGE_AUTH = 'hurricane_auth';

export const STATUS = {
  CODE_400: 400,
};

export const MESSAGE_TIMEOUT = 4000;

export const TOASTS_TEXT = {
  authOkMessage: 'Login successful',
  authError400Message: 'Error: You entered an incorrect username or password',
  registrationOkMessage: 'Registration successful',
  logoutMessage: 'Good bye!',
};

export const PAGE_NUMBER_ONE = 1;

export const PRODUCTS_IN_PAGE = 6;

export const NUMBER_ZERO = 0;

export const MAX_QUERY_LIMIT = 500;

export const CATALOG_PAGE_TEXT = {
  headerTitle: 'Catalog',
  headerSubtitle: 'Main > Catalog',
  headerImage: 'Bookshelf image',
  allCategories: 'All categories',
  filterMain: 'Filter',
  filterSort: 'Sort by',
  filterSearch: 'Search',
  noImageUrl: '../../assets/catalog-page/no-image.jpg',
};

export const SORT_FILTER: SimpleObject = {
  priceUp: 'Price ↑',
  priceDown: 'Price ↓',
  nameUp: 'Name ↑',
  nameDown: 'Name ↓',
  authorUp: 'Author ↑',
  authorDown: 'Author ↓',
};

export const SORT_FILTER_PROPS = [
  {
    id: 1,
    value: 'priceUp',
  },
  {
    id: 2,
    value: 'priceDown',
  },
  {
    id: 3,
    value: 'nameUp',
  },
  {
    id: 4,
    value: 'nameDown',
  },
  {
    id: 5,
    value: 'authorUp',
  },
  {
    id: 6,
    value: 'authorDown',
  },
];

export const SORT_REQUESTS: SimpleObject = {
  priceUp: `price asc`,
  priceDown: `price desc`,
  nameUp: `name.en asc`,
  nameDown: `name.en desc`,
  authorUp: `variants.attributes.author asc`,
  authorDown: `variants.attributes.author desc`,
};

export const MAIN_FILTER_PROPS = {
  cover: {
    title: 'Cover:',
    name: 'coverFilter',
    values: [
      {
        id: 'paperback',
        value: 'Paperback',
      },
      {
        id: 'hardcover',
        value: 'Hardcover',
      },
    ],
  },
  btnClearAll: 'Clear all',
  btnApply: 'Apply',
};

export enum MainFilterValues {
  Paperback = 'Paperback',
  Hardcover = 'Hardcover',
}

export const SIMPLE_FILTERS_REQUESTS: SimpleObject = {
  priceUp: `price asc`,
  priceDown: `price desc`,
  nameUp: `name.en asc`,
  nameDown: `name.en desc`,
  authorUp: `variants.attributes.author asc`,
  authorDown: `variants.attributes.author desc`,
};
