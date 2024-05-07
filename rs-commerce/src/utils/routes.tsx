import Login from 'views/login/Login';
import Main from 'views/main/Main';
import Registration from 'views/registration/Registration';

const routes = [
  {
    path: '/',
    component: <Main />,
  },
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/registration',
    component: <Registration />,
  },
];

export default routes;
