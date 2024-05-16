import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { LOCAL_STORAGE_TOKEN } from 'constants/constants';

const ENV = import.meta.env;
const projectKey = ENV.VITE_CTP_PROJECT_KEY;

function apiRootWithExistingTokenFlow() {
  const authorization: string = `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN) as string).token}`;

  const existingTokenMiddlewareOptions: ExistingTokenMiddlewareOptions = {
    force: true,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: ENV.VITE_CTP_API_URL,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withExistingTokenFlow(authorization, existingTokenMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: ENV.VITE_CTP_PROJECT_KEY,
  });
}

export default apiRootWithExistingTokenFlow;
