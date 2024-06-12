import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import routes, { publicRoutes } from 'utils/routes';
import Layout from 'components/layout/Layout';
import {
  LOCAL_STORAGE_ANONYM_CART_ID,
  LOCAL_STORAGE_AUTH_CART_ID,
  LOCAL_STORAGE_TOKEN,
} from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import { useEffect } from 'react';
import { apiAuthSelector } from 'redux/selectors';
import { apiCreateCart, apiGetCart } from 'api/api';
import getRequestErrorMessage from 'utils/utils';
import toast from 'react-hot-toast';
import { cartActions } from 'redux/slices/cart-slice';

function App() {
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector(apiAuthSelector);

  const getCartData = async (auth: boolean) => {
    try {
      let data = null;
      let cartId = auth
        ? localStorage.getItem(LOCAL_STORAGE_AUTH_CART_ID)
        : localStorage.getItem(LOCAL_STORAGE_ANONYM_CART_ID);

      if (!cartId) {
        const newCart = await apiCreateCart();
        cartId = newCart.body.id;
        // after deletion of cart in cart page remove it from local storage
        localStorage.setItem(
          auth ? LOCAL_STORAGE_AUTH_CART_ID : LOCAL_STORAGE_ANONYM_CART_ID,
          cartId,
        );
      }

      data = await apiGetCart(cartId);
      if (data?.body) dispatch(cartActions.setCartData(data?.body));
    } catch (e) {
      const error = getRequestErrorMessage(e.code);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN)!)) {
      dispatch(apiAuthActions.setIsAuth(true));
    } else {
      dispatch(apiAuthActions.setIsAuth(false));
    }
  }, []);

  useEffect(() => {
    getCartData(isAuth);
  }, [isAuth]);

  return (
    <BrowserRouter>
      {isAuth ? (
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<Layout>{route.component}</Layout>}
            />
          ))}
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.redirect ? <Navigate to="/login" /> : <Layout>{route.component}</Layout>
              }
            />
          ))}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
