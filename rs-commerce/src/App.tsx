import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import routes, { publicRoutes } from 'utils/routes';
import Layout from 'components/layout/Layout';
import { LOCAL_STORAGE_TOKEN } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import { useEffect } from 'react';
import { apiAuthSelector } from 'redux/selectors';

function App() {
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector(apiAuthSelector);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN)!)) {
      dispatch(apiAuthActions.setIsAuth(true));
    } else {
      dispatch(apiAuthActions.setIsAuth(false));
    }
  }, []);

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
