import { ClientResponse, CustomerSignInResult, ErrorResponse } from '@commercetools/platform-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiLogin } from 'api/api';
import { LOCAL_STORAGE_AUTH, STATUS } from 'constants/constants';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import { loginFormActions } from 'redux/slices/login-form-slice';
import { serviceMessageActions } from 'redux/slices/service-message-slice';
import { LoginData } from 'types/types';

function* workStartAuthFetchSaga(action: PayloadAction<{ data: LoginData }>) {
  try {
    const response: ClientResponse<CustomerSignInResult> = yield call(
      apiLogin,
      action.payload.data,
    );
    yield put(apiAuthActions.setUserData(response.body));
    yield put(apiAuthActions.setIsAuth(true));
    yield put(loginFormActions.resetLoginFormSlice());
    yield put(serviceMessageActions.setAuthOk(true));
    yield localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(true));
  } catch (e: unknown) {
    const error = e as ErrorResponse;
    if (error?.statusCode === STATUS.CODE_400) {
      yield put(apiAuthActions.setIsAuthError400(true));
      yield put(serviceMessageActions.setAuthError400(true));
      yield put(serviceMessageActions.setLoginFormErrorMessage(true));
    }
  } finally {
    yield put(apiAuthActions.setIsLoadingAuth(false));
    yield put(apiAuthActions.resetLoginData());
  }
}

function* watchStartAuthFetchSaga() {
  yield takeEvery(apiAuthActions.startAuth, workStartAuthFetchSaga);
}

export default function* rootSaga() {
  yield all([watchStartAuthFetchSaga()]);
}
