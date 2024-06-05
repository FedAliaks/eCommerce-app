import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import routes from 'utils/routes';
import Layout from 'components/layout/Layout';
import { LOCAL_STORAGE_TOKEN } from 'constants/constants';
import { useAppDispatch } from 'hooks/typed-react-redux-hooks';
import { apiAuthActions } from 'redux/slices/api-auth-slice';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();

  alert(
    'Приветствую. Если есть возможность, то проверь нас в четверг. Заранее благодарны. Успехов в завершении курса. Осталось немного',
  );

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN)!)) {
      dispatch(apiAuthActions.setIsAuth(true));
    } else {
      dispatch(apiAuthActions.setIsAuth(false));
    }
  }, []);

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
