import { TokenStore } from '@commercetools/sdk-client-v2';
import { LOCAL_STORAGE_AUTH, LOCAL_STORAGE_TOKEN } from 'constants/constants';

export function setToken(cache: TokenStore, isAuthorized: boolean): void {
  localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(cache));
  localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(isAuthorized));
}

export function getToken(): TokenStore {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN)!) as TokenStore;
}
