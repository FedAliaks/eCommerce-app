import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import routes from 'utils/routes';
import Layout from 'components/layout/Layout';
import { LOCAL_STORAGE_AUTH } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import { useEffect } from 'react';
import { apiAuthSelector } from 'redux/selectors';

function App() {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(apiAuthSelector);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH)!) && userData)
      dispatch(apiAuthActions.setIsAuth(true));
  }, [userData]);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<Layout>{route.component}</Layout>} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
