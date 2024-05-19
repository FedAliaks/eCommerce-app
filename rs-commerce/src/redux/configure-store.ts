import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { apiAuthReducer } from './slices/api-auth-slice';
import { loginFormReducer } from './slices/login-form-slice';
import { apiRegistrationReducer } from './slices/api-registration-slice';
import { apiCategoriesProductsReducer } from './slices/api-categories-products';
import rootSaga from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    apiAuth: apiAuthReducer,
    loginForm: loginFormReducer,
    apiRegistration: apiRegistrationReducer,
    apiCategoriesProducts: apiCategoriesProductsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
