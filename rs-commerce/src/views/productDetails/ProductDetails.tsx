import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiCreateCart, apiGetCart, apiGetOneCategory, apiGetProductDetails } from 'api/api';
import Loader from 'components/loader/loader';
import getRequestErrorMessage from 'utils/utils';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { productDetailSliceActions } from 'redux/slices/product-detail-slice';
import { apiAuthSelector, cartSelector, productDetailsSelector } from 'redux/selectors';
import { ErrorResponse } from '@commercetools/importapi-sdk';
import toast from 'react-hot-toast';
import { LOCAL_STORAGE_ANONYM_CART_ID, ROUTE_PATH } from 'constants/constants';
import { cartActions } from 'redux/slices/cart-slice';
import { Breadcrumbs, DescriptionBlock, ImageBlock } from './components';
import style from './style.module.css';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector(productDetailsSelector);
  const { cartData } = useAppSelector(cartSelector);
  const { isAuth } = useAppSelector(apiAuthSelector);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [categoryLink, setCategoryLink] = useState<{ name: string; path: string }[]>([]);

  const breadcrumbsLinks = [
    {
      name: 'Main',
      path: ROUTE_PATH.main,
    },
    {
      name: 'Catalog',
      path: ROUTE_PATH.catalog,
    },
  ];

  const getProductDetails = async (productId: string) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const data = await apiGetProductDetails(productId);

      dispatch(productDetailSliceActions.setProductDetail(data.body.masterData.current));
      dispatch(productDetailSliceActions.setActiveSlide(0));
      dispatch(productDetailSliceActions.setModalActiveSlide(0));
    } catch (e) {
      const error = getRequestErrorMessage(e.code);
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getParentCategoryData = async (categoryId: string) => {
    try {
      const categoryData = await apiGetOneCategory({ isKey: false, categoryKey: categoryId });

      if (breadcrumbsLinks.find((link) => link.name === categoryData.body.name?.['en'])) return;

      if (categoryData.body.name['en']) {
        setCategoryLink([
          {
            name: categoryData.body.name['en'],
            path: `/catalog/${categoryData.body.key}`,
          },
        ]);
      }
    } catch (e) {
      const error = e as ErrorResponse;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (id) getProductDetails(id);
  }, [id]);

  useEffect(() => {
    if (
      productDetail &&
      productDetail.categories &&
      productDetail.categories.length > 0 &&
      typeof productDetail?.categories?.[0]?.id === 'string'
    ) {
      getParentCategoryData(productDetail.categories[0].id);
    }
  }, [productDetail]);

  const getCartData = async () => {
    try {
      let data = null;
      let cartId = localStorage.getItem(LOCAL_STORAGE_ANONYM_CART_ID);

      if (!isAuth && !cartId) {
        const newCart = await apiCreateCart();
        cartId = newCart.body.id;
        localStorage.setItem(LOCAL_STORAGE_ANONYM_CART_ID, cartId);
      }

      data = await apiGetCart(cartId);

      if (data?.body) dispatch(cartActions.setCartData(data?.body));
    } catch (e) {
      const error = getRequestErrorMessage(e.code);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!cartData) {
      getCartData();
    }
  }, [cartData]);

  if (isLoading) return <Loader isShow />;
  if (errorMessage) return <div className={`container ${style['error']}`}>{errorMessage}</div>;

  return (
    <>
      <Breadcrumbs
        productName={productDetail?.name['en'] as string}
        breadcrumbLinks={[...breadcrumbsLinks, ...categoryLink]}
      />
      <div className={`container ${style['product-details']}`}>
        <ImageBlock />
        <DescriptionBlock />
      </div>
    </>
  );
}

export default ProductDetails;
