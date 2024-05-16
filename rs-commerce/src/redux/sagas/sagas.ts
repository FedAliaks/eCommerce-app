import { ClientResponse, CustomerSignInResult, ErrorResponse } from '@commercetools/platform-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiLogin } from 'api/api';
import { LOCAL_STORAGE_AUTH, STATUS, TOASTS_TEXT } from 'constants/constants';
import toast from 'react-hot-toast';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import { loginFormActions } from 'redux/slices/login-form-slice';
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
    yield localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(true));
    yield toast.success(TOASTS_TEXT.authOkMessage);
  } catch (e: unknown) {
    const error = e as ErrorResponse;
    if (error?.statusCode === STATUS.CODE_400) {
      yield put(apiAuthActions.setIsAuthError400(true));
      yield put(loginFormActions.setLoginFormErrorMessage(TOASTS_TEXT.authError400Message));
      yield toast.error(TOASTS_TEXT.authError400Message);
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
