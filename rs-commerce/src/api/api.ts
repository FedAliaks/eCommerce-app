import { ClientResponse } from '@commercetools/importapi-sdk';
import {
  ByProjectKeyRequestBuilder,
  CategoryPagedQueryResponse,
  CustomerSignInResult,
  MyCustomerDraft,
  ProductPagedQueryResponse,
  ProductProjection,
} from '@commercetools/platform-sdk';
import apiRootWithAnonymousSessionFlow from 'SDK/apiRootWithAnonymousSessionFlow';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import apiRootWithPasswordFlow from 'SDK/apiRootWithPasswordFlow';
import { LOCAL_STORAGE_TOKEN } from 'constants/constants';
import { LoginData, QueryParamsCategories, QueryParamsProducts } from 'types/types';

export async function apiSignUp(
  data: MyCustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> {
  const response = await apiRootWithAnonymousSessionFlow()
    .me()
    .signup()
    .post({ body: data })
    .execute();

  return response;
}

export async function apiLogin(data: LoginData): Promise<ClientResponse<CustomerSignInResult>> {
  const response = await apiRootWithPasswordFlow(data).me().login().post({ body: data }).execute();

  return response;
}

export async function getAllCategories(
  queryArgs: QueryParamsCategories,
): Promise<ClientResponse<CategoryPagedQueryResponse>> {
  let apiRoot: ByProjectKeyRequestBuilder;
  if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
    apiRoot = apiRootWithExistingTokenFlow();
  } else {
    apiRoot = apiRootWithAnonymousSessionFlow();
  }

  const response = await apiRoot.categories().get({ queryArgs }).execute();

  return response;
}

export async function getAllProducts(
  queryArgs?: QueryParamsProducts,
): Promise<ClientResponse<ProductPagedQueryResponse>> {
  let apiRoot: ByProjectKeyRequestBuilder;
  if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
    apiRoot = apiRootWithExistingTokenFlow();
  } else {
    apiRoot = apiRootWithAnonymousSessionFlow();
  }

  const response = await apiRoot.products().get({ queryArgs }).execute();

  return response;
}

export async function getProductById(id: string): Promise<ClientResponse<ProductProjection>> {
  let apiRoot: ByProjectKeyRequestBuilder;
  if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
    apiRoot = apiRootWithExistingTokenFlow();
  } else {
    apiRoot = apiRootWithAnonymousSessionFlow();
  }

  const response = await apiRoot.productProjections().withId({ ID: id }).get().execute();

  return response;
}
