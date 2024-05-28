import { QueryParam } from '@commercetools/importapi-sdk';
import {
  Category,
  CustomerSignInResult,
  MyCustomerDraft,
  ProductProjection,
} from '@commercetools/platform-sdk';

export type LoginFormSliceState = {
  emailValue: string;
  emailTouched: boolean;
  isEmailValid: boolean;
  emailTips: string;
  passwordValue: string;
  passwordTouched: boolean;
  isPasswordValid: boolean;
  passwordTips: string;
  loginFormErrorMessage: string;
};

export type Nullable<T> = T | null;

export type ApiAuthSliceState = {
  isLoadingAuth: boolean;
  isAuth: boolean;
  loginData: Nullable<LoginData>;
  isAuthError400: boolean;
  userData: Nullable<CustomerSignInResult>;
};

export type ApiRegistrationSliceState = {
  isLoadingRegistration: boolean;
  registrationData: Nullable<MyCustomerDraft>;
  isRegistrationError400: boolean;
};

export type ButtonBigProps = {
  content: string;
  isActiveStyle?: boolean;
  onClick?: () => void;
};

export type InputProps = {
  nameWrapper: string;
  nameId: string;
  namePlaceholder: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputTips: string;
  clearFunction?: () => void;
};

export type LoginData = {
  email: string;
  password: string;
};

export type MessageProps = {
  isOk: boolean;
  content: string;
  closeElement: () => void;
};

export type CustomLinkProps = {
  to: string;
  elStyle: string;
  text: string;
};

export type QueryParamsCategories = {
  expand?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  where?: string | string[];
  [key: string]: QueryParam;
};

export type QueryParamsProducts = {
  where?: string | string[];
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceChannel?: string;
  localeProjection?: string | string[];
  expand?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  [key: string]: QueryParam;
};

export type QueryParamsProductsProjections = {
  fuzzy?: boolean;
  fuzzyLevel?: number;
  markMatchingVariants?: boolean;
  filter?: string | string[];
  'filter.facets'?: string | string[];
  'filter.query'?: string | string[];
  facet?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
  expand?: string | string[];
  [key: string]: QueryParam;
};

export type ApiCategoriesProductsSliceState = {
  isLoadingCategories: boolean;
  categories: Nullable<Category[]>;
  curCategory: Nullable<Category>;
  isLoadingProducts: boolean;
  products: Nullable<ProductProjection[]>;
  queryParamsProducts: Nullable<QueryParamsProductsProjections>;
  productsTotal: Nullable<number>;
  curProductsPage: number;
  productsInPage: number;
  searchInputValue: string;
  productsFilter: Nullable<FilterType>;
};

export type ProductProjectionItemProps = {
  product: ProductProjection;
};

export type ButtonPaginationProps = {
  content: string;
  curStyle?: string;
  onClick?: () => void;
};

export type CategoryItemProps = {
  data: Nullable<Category>;
  onClick: (data: Nullable<Category>) => void;
};

export enum FilterType {
  mainFilter = 'mainFilter',
  sortFilter = 'sortFilter',
}

export type SortFilterContentProps = {
  onClick?: () => void;
};
