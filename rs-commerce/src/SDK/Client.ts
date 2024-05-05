import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './BuildClient';

const ENV = import.meta.env;

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: ENV.VITE_CTP_PROJECT_KEY,
});

export default apiRoot;
