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
  productDetails: '/product-details',
  productDetailsId: '/product-details/:id',
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
  price: {
    title: 'Price:',
    line: { from: 'From', to: 'to' },
  },
  cover: {
    title: 'Cover:',
    name: 'cover',
    values: [
      { id: 'Paperback', value: 'Paperback' },
      { id: 'Hardcover', value: 'Hardcover' },
    ],
  },
  format: {
    title: 'Format:',
    name: 'format',
    values: [
      { id: 'A4', value: 'A4' },
      { id: 'A5', value: 'A5' },
      { id: 'A6', value: 'A6' },
    ],
  },
  rating: {
    title: 'Rating:',
    name: 'rating',
    values: [
      { id: '5.0', value: '5.0' },
      { id: '4.9', value: '4.9' },
      { id: '4.8', value: '4.8' },
      { id: '4.7', value: '4.7' },
      { id: '4.6', value: '4.6' },
      { id: '4.5', value: '4.5' },
      { id: '4.4', value: '4.4' },
      { id: '4.3', value: '4.3' },
      { id: '4.2', value: '4.2' },
      { id: '4.1', value: '4.1' },
      { id: '4.0', value: '4.0' },
      { id: '3.9', value: '3.9' },
      { id: '3.8', value: '3.8' },
      { id: '3.7', value: '3.7' },
      { id: '3.6', value: '3.6' },
      { id: '3.5', value: '3.5' },
      { id: '3.4', value: '3.4' },
      { id: '3.3', value: '3.3' },
      { id: '3.2', value: '3.2' },
      { id: '3.1', value: '3.1' },
      { id: '3.0', value: '3.0' },
      { id: '2.9', value: '2.9' },
      { id: '2.8', value: '2.8' },
      { id: '2.7', value: '2.7' },
      { id: '2.6', value: '2.6' },
      { id: '2.5', value: '2.5' },
      { id: '2.4', value: '2.4' },
      { id: '2.3', value: '2.3' },
      { id: '2.2', value: '2.2' },
      { id: '2.1', value: '2.1' },
      { id: '2.0', value: '2.0' },
      { id: '1.9', value: '1.9' },
      { id: '1.8', value: '1.8' },
      { id: '1.7', value: '1.7' },
      { id: '1.6', value: '1.6' },
      { id: '1.5', value: '1.5' },
      { id: '1.4', value: '1.4' },
      { id: '1.3', value: '1.3' },
      { id: '1.2', value: '1.2' },
      { id: '1.1', value: '1.1' },
      { id: '1.0', value: '1.0' },
      { id: '0.9', value: '0.9' },
      { id: '0.8', value: '0.8' },
      { id: '0.7', value: '0.7' },
      { id: '0.6', value: '0.6' },
      { id: '0.5', value: '0.5' },
      { id: '0.4', value: '0.4' },
      { id: '0.3', value: '0.3' },
      { id: '0.2', value: '0.2' },
      { id: '0.1', value: '0.1' },
      { id: '0.0', value: '0.0' },
    ],
  },
  btnClearAll: 'Clear all',
  btnApply: 'Apply',
};

export const INITIAL_SIMPLE_FILTER_VALUES = {
  cover: {
    Paperback: false,
    Hardcover: false,
  },
  format: {
    A4: false,
    A5: false,
    A6: false,
  },
  rating: {
    '5.0': false,
    '4.9': false,
    '4.8': false,
    '4.7': false,
    '4.6': false,
    '4.5': false,
    '4.4': false,
    '4.3': false,
    '4.2': false,
    '4.1': false,
    '4.0': false,
    '3.9': false,
    '3.8': false,
    '3.7': false,
    '3.6': false,
    '3.5': false,
    '3.4': false,
    '3.3': false,
    '3.2': false,
    '3.1': false,
    '3.0': false,
    '2.9': false,
    '2.8': false,
    '2.7': false,
    '2.6': false,
    '2.5': false,
    '2.4': false,
    '2.3': false,
    '2.2': false,
    '2.1': false,
    '2.0': false,
    '1.9': false,
    '1.8': false,
    '1.7': false,
    '1.6': false,
    '1.5': false,
    '1.4': false,
    '1.3': false,
    '1.2': false,
    '1.1': false,
    '1.0': false,
    '0.9': false,
    '0.8': false,
    '0.7': false,
    '0.6': false,
    '0.5': false,
    '0.4': false,
    '0.3': false,
    '0.2': false,
    '0.1': false,
    '0.0': false,
  },
};

export const SIMPLE_FILTERS_REQUESTS: SimpleObject = {
  priceUp: `price asc`,
  priceDown: `price desc`,
  nameUp: `name.en asc`,
  nameDown: `name.en desc`,
  authorUp: `variants.attributes.author asc`,
  authorDown: `variants.attributes.author desc`,
};

export const INITIAL_SORT_FILTER_VALUE = 'priceUp';

export const INITIAL_PRICE_FILTER_VALUE = {
  min: null,
  max: null,
};
