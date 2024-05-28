import { ROUTE_PATH } from 'constants/constants';
import Login from 'views/login/Login';
import Main from 'views/main/Main';
import NotFound from 'views/notFound/NotFound';
import ProductDetails from 'views/productDetails/ProductDetails';
import Registration from 'views/registration/Registration';

const routes = [
  {
    path: ROUTE_PATH.main,
    component: <Main />,
  },
  {
    path: ROUTE_PATH.login,
    component: <Login />,
  },
  {
    path: ROUTE_PATH.registration,
    component: <Registration />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
  {
    path: ROUTE_PATH.productDetails,
    component: <ProductDetails />,
  },
];

export default routes;
