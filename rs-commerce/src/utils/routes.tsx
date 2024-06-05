import { ROUTE_PATH } from 'constants/constants';
import Catalog from 'views/Catalog/Catalog';
import Login from 'views/login/Login';
import Main from 'views/main/Main';
import NotFound from 'views/notFound/NotFound';
import ProductDetails from 'views/productDetails/ProductDetails';
import Registration from 'views/registration/Registration';
import UserProfile from 'views/user-profile/UserProfile';
import AddNewAddress from 'views/user-profile/add-new-address/AddNewAddress';
import ChangeAddress from 'views/user-profile/change-address/ChangeAddress';
import ChangeName from 'views/user-profile/change-name/ChangeName';
import ChangePassword from 'views/user-profile/change-password/ChangePassword';

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
    path: ROUTE_PATH.profile,
    component: <UserProfile />,
  },
  {
    path: ROUTE_PATH.changePassword,
    component: <ChangePassword />,
  },
  {
    path: ROUTE_PATH.changeName,
    component: <ChangeName />,
  },
  {
    path: ROUTE_PATH.addNewAddress,
    component: <AddNewAddress />,
  },
  {
    path: ROUTE_PATH.changeAddress,
    component: <ChangeAddress />,
  },
  {
    path: ROUTE_PATH.catalog,
    component: <Catalog />,
  },
  {
    path: ROUTE_PATH.catalogCategory,
    component: <Catalog />,
  },
  {
    path: ROUTE_PATH.productDetailsId,
    component: <ProductDetails />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export const publicRoutes = [
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
    path: ROUTE_PATH.profile,
    redirect: true,
  },
  {
    path: ROUTE_PATH.changePassword,
    redirect: true,
  },
  {
    path: ROUTE_PATH.changeName,
    redirect: true,
  },
  {
    path: ROUTE_PATH.addNewAddress,
    redirect: true,
  },
  {
    path: ROUTE_PATH.changeAddress,
    redirect: true,
  },
  {
    path: ROUTE_PATH.catalog,
    component: <Catalog />,
  },
  {
    path: ROUTE_PATH.catalogCategory,
    component: <Catalog />,
  },
  {
    path: ROUTE_PATH.productDetailsId,
    component: <ProductDetails />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default routes;
