import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { LoginData } from 'types/types';
import { getToken, setToken } from 'utils/token-utils';

const ENV = import.meta.env;
const projectKey = ENV.VITE_CTP_PROJECT_KEY;
const scopes = ENV.VITE_CTP_SCOPES.split(' ');

function apiRootWithPasswordFlow(data: LoginData) {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: ENV.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: ENV.VITE_CTP_CLIENT_ID,
      clientSecret: ENV.VITE_CTP_CLIENT_SECRET,
      user: {
        username: data.email,
        password: data.password,
      },
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
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: ENV.VITE_CTP_PROJECT_KEY,
  });
}

export default apiRootWithPasswordFlow;
