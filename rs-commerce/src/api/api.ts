import { ClientResponse } from '@commercetools/importapi-sdk';
import {
  ByProjectKeyRequestBuilder,
  Cart,
  CartDraft,
  CartUpdate,
  Category,
  CategoryPagedQueryResponse,
  CustomerSignInResult,
  MyCartDraft,
  MyCartUpdate,
  MyCustomerDraft,
  Product,
  ProductPagedQueryResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import apiRootWithAnonymousSessionFlow from 'SDK/apiRootWithAnonymousSessionFlow';
import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';
import apiRootWithPasswordFlow from 'SDK/apiRootWithPasswordFlow';
import { LOCAL_STORAGE_TOKEN } from 'constants/constants';
import {
  LoginData,
  QueryParamsCategories,
  QueryParamsProducts,
  QueryParamsProductsProjections,
} from 'types/types';

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

export async function getAllProductsProjections(
  queryArgs?: QueryParamsProductsProjections,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  let apiRoot: ByProjectKeyRequestBuilder;
  if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
    apiRoot = apiRootWithExistingTokenFlow();
  } else {
    apiRoot = apiRootWithAnonymousSessionFlow();
  }

  const response = await apiRoot.productProjections().search().get({ queryArgs }).execute();

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

export async function apiGetProductDetails(productId: string): Promise<ClientResponse<Product>> {
  const response = await apiRootWithAnonymousSessionFlow()
    .products()
    .withId({ ID: productId })
    .get()
    .execute();

  return response;
}

export async function apiGetOneCategory({
  isKey,
  categoryKey,
}: {
  isKey: boolean;
  categoryKey: string;
}): Promise<ClientResponse<Category>> {
  let apiRoot: ByProjectKeyRequestBuilder;
  if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
    apiRoot = apiRootWithExistingTokenFlow();
  } else {
    apiRoot = apiRootWithAnonymousSessionFlow();
  }
  let response = null;
  if (isKey) {
    response = await apiRoot.categories().withKey({ key: categoryKey }).get().execute();
  } else {
    response = await apiRoot.categories().withId({ ID: categoryKey }).get().execute();
  }

  return response;
}

export const apiCreateCart = async () => {
  let response;
  if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
    response = await apiRootWithExistingTokenFlow()
      .carts()
      .post({
        body: {
          currency: 'EUR',
        },
      })
      .execute();
  } else {
    response = await apiRootWithAnonymousSessionFlow()
      .me()
      .carts()
      .post({
        body: {
          currency: 'EUR',
        },
      })
      .execute();
  }

  return response;
};
export const apiGetCart = (cartId: string) => {
  let response;
  if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
    response = apiRootWithExistingTokenFlow().me().carts().get().execute(); // activeCart().get().execute();//carts().//.withId({ ID: cartId }).get().execute();
  } else {
    response = apiRootWithAnonymousSessionFlow().carts().withId({ ID: cartId }).get().execute();
  }

  return response;
};

export const apiUpdateCart = async ({
  data,
  cartId,
}: {
  data: MyCartDraft | MyCartUpdate | CartDraft | CartUpdate;
  cartId?: string;
}) => {
  let response: ClientResponse<Cart>;

  if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
    response = await apiRootWithExistingTokenFlow()
      .me()
      .carts()
      .post({ body: (data as MyCartDraft) || (data as MyCartUpdate) })
      .execute();
  } else {
    response = await apiRootWithAnonymousSessionFlow()
      .carts()
      .withId({ ID: cartId as string })
      .post({ body: (data as CartUpdate) || (data as CartDraft) })
      .execute();
  }
  return response;
};
