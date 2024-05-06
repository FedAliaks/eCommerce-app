import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const ENV = import.meta.env;
const projectKey = ENV.VITE_CTP_PROJECT_KEY;
const scopes = ENV.VITE_CTP_SCOPES.split(' ');

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: ENV.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: ENV.VITE_CTP_CLIENT_ID,
    clientSecret: ENV.VITE_CTP_CLIENT_SECRET,
  },
  scopes,
  fetch,
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

export default ctpClient;
