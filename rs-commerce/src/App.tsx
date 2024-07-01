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
import { apiCreateCart, apiGetActiveCart, apiGetCart } from 'api/api';
import getRequestErrorMessage from 'utils/utils';
import toast from 'react-hot-toast';
import { cartActions } from 'redux/slices/cart-slice';

function App() {
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector(apiAuthSelector);

  const getCartData = async (auth: boolean) => {
    let data = null;
    let cartId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN)!)
      ? localStorage.getItem(LOCAL_STORAGE_AUTH_CART_ID)
      : localStorage.getItem(LOCAL_STORAGE_ANONYM_CART_ID);

    if (!cartId) {
      if (auth) {
        try {
          const activeCart = await apiGetActiveCart();

          if (activeCart?.body && activeCart?.body.id) {
            dispatch(cartActions.setCartData(activeCart?.body));
            localStorage.setItem(LOCAL_STORAGE_AUTH_CART_ID, activeCart?.body.id);
            return;
          }
        } catch (e) {
          if (e.code === 404) {
            const newCart = await apiCreateCart();
            cartId = newCart.body.id;

            // after deletion of cart in cart page create new empty active cart and replace cart id in local storage
            localStorage.setItem(LOCAL_STORAGE_AUTH_CART_ID, cartId);
            if (newCart?.body) {
              dispatch(cartActions.setCartData(newCart?.body));
              return;
            }
          }
        }
        return;
      }
      try {
        const newCart = await apiCreateCart();
        cartId = newCart.body.id;

        // after deletion of cart in cart page create new empty active cart and replace cart id in local storage
        localStorage.setItem(
          auth ? LOCAL_STORAGE_AUTH_CART_ID : LOCAL_STORAGE_ANONYM_CART_ID,
          cartId,
        );
        if (newCart?.body) {
          dispatch(cartActions.setCartData(newCart?.body));
          return;
        }
      } catch (e) {
        const error = getRequestErrorMessage(e.code);
        toast.error(error);
      }
    }
    try {
      data = await apiGetCart(cartId as string);
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
