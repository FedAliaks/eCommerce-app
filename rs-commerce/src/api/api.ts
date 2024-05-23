import { ClientResponse } from '@commercetools/importapi-sdk';
import { CustomerSignInResult, MyCustomerDraft } from '@commercetools/platform-sdk';
import apiRootWithAnonymousSessionFlow from 'SDK/apiRootWithAnonymousSessionFlow';
import apiRootWithPasswordFlow from 'SDK/apiRootWithPasswordFlow';
import { LoginData } from 'types/types';

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
