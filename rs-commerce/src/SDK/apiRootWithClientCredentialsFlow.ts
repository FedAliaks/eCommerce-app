import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { getToken, setToken } from 'utils/token-utils';

const ENV = import.meta.env;
const projectKey = ENV.VITE_CTP_PROJECT_KEY;
const scopes = ENV.VITE_CTP_SCOPES.split(' ');

function apiRootWithClientCredentialsFlow() {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: ENV.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: ENV.VITE_CTP_CLIENT_ID,
      clientSecret: ENV.VITE_CTP_CLIENT_SECRET,
    },
    scopes,
    fetch,
    tokenCache: {
      get() {
        return getToken();
      },
      set(cache) {
        setToken(cache);
      },
    },
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: ENV.VITE_CTP_API_URL,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: ENV.VITE_CTP_PROJECT_KEY,
  });
}

export default apiRootWithClientCredentialsFlow;
