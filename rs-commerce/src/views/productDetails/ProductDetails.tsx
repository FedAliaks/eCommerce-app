import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiGetProductDetails } from 'api/api';
import Loader from 'components/loader/loader';
import getRequestErrorMessage from 'utils/utils';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { productDetailSliceActions } from 'redux/slices/product-detail-slice';
import { Breadcrumbs, DescriptionBlock, ImageBlock } from './components';
import style from './style.module.css';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const productDetail = useAppSelector((state) => state.productDetail.productDetail);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    if (id) getProductDetails(id);
  }, [id]);

  if (isLoading) return <Loader isShow />;
  if (errorMessage) return <div className={`container ${style['error']}`}>{errorMessage}</div>;

  return (
    <>
      <Breadcrumbs productName={productDetail?.name['en'] as string} />
      <div className={`container ${style['product-details']}`}>
        <ImageBlock />
        <DescriptionBlock />
      </div>
    </>
  );
}

export default ProductDetails;
