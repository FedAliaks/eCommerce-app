import {
  ClientResponse,
  CustomerSignInResult,
  ErrorResponse,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiLogin, apiSignUp } from 'api/api';
import { LOCAL_STORAGE_AUTH, LOCAL_STORAGE_TOKEN, TOASTS_TEXT } from 'constants/constants';
import toast from 'react-hot-toast';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import { apiRegistrationActions } from 'redux/slices/api-registration-slice';
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
    yield put(apiAuthActions.setIsAuthError400(true));
    yield put(loginFormActions.setLoginFormErrorMessage(TOASTS_TEXT.authError400Message));
    yield toast.error(error.message);
  } finally {
    yield put(apiAuthActions.setIsLoadingAuth(false));
    yield put(apiAuthActions.resetLoginData());
  }
}

function* workStartRegistrationFetchSaga(action: PayloadAction<{ data: MyCustomerDraft }>) {
  try {
    const response: ClientResponse<CustomerSignInResult> = yield call(
      apiSignUp,
      action.payload.data,
    );
    yield put(apiAuthActions.setUserData(response.body));
    yield put(apiAuthActions.setIsAuth(true));
    yield put(apiRegistrationActions.resetApiRegistrationSlice());
    yield localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(true));
    yield toast.success(TOASTS_TEXT.registrationOkMessage);
  } catch (e: unknown) {
    const error = e as ErrorResponse;
    yield localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    yield put(apiRegistrationActions.setIsRegistrationError400(true));
    yield toast.error(error.message);
  } finally {
    yield put(apiRegistrationActions.setIsLoadingRegistration(false));
  }
}

function* watchStartAuthFetchSaga() {
  yield takeEvery(apiAuthActions.startAuth, workStartAuthFetchSaga);
}

function* watchStartRegistrationFetchSaga() {
  yield takeEvery(apiRegistrationActions.startRegistration, workStartRegistrationFetchSaga);
}

export default function* rootSaga() {
  yield all([watchStartAuthFetchSaga(), watchStartRegistrationFetchSaga()]);
}
