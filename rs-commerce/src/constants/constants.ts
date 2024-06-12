import { SimpleFiltersValues, SimpleObject } from 'types/types';
import { getInitialSimpleFiltersValues, getRatingValues } from 'utils/checkbox-utils';

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

  profile: '/profile',
  changePassword: '/profile/change-password',
  changeName: '/profile/change-name',
  changeAddress: '/profile/change-address',
  addNewAddress: '/profile/add-address',
  productDetails: '/product-details',
  productDetailsId: '/product-details/:id',
  catalog: '/catalog',
  catalogCategory: '/catalog/:category',
};

export const LOCAL_STORAGE_TOKEN = 'hurricane_access_token';

export const LOCAL_STORAGE_ANONYM_CART_ID = 'hurricane_anonym_cart';
export const LOCAL_STORAGE_AUTH_CART_ID = 'hurricane_auth_cart';

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

export const RATING_VALUES_PROPS = {
  min: 0,
  max: 5,
  step: 0.1,
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
    values: getRatingValues(
      RATING_VALUES_PROPS.min,
      RATING_VALUES_PROPS.max,
      RATING_VALUES_PROPS.step,
    ),
  },
  btnClearAll: 'Clear all',
  btnApply: 'Apply',
};

export const INITIAL_SIMPLE_FILTER_VALUES: SimpleFiltersValues = {
  cover: getInitialSimpleFiltersValues(MAIN_FILTER_PROPS.cover.values),
  format: getInitialSimpleFiltersValues(MAIN_FILTER_PROPS.format.values),
  rating: getInitialSimpleFiltersValues(MAIN_FILTER_PROPS.rating.values),
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

export const EMPTY_RESPONSE = `There are no products matching your request. \nChange the conditions in the filter.`;
