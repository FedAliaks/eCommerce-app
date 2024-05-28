import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiGetProductDetails } from 'api/api';
import Loader from 'components/loader/loader';
import { ProductData } from '@commercetools/platform-sdk';
import getRequestErrorMessage from 'utils/utils';
import { ProductImageItem } from 'types/types';
import { Breadcrumbs, DescriptionBlock, ImageBlock } from './components';
import style from './style.module.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const getProductDetails = async (productId: string) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const data = await apiGetProductDetails(productId);

      setProduct(data.body.masterData.current);
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
      <Breadcrumbs productName={product?.name['en'] as string} />
      <div className={`container ${style['product-details']}`}>
        <ImageBlock images={product?.masterVariant.images as ProductImageItem[]} />
        <DescriptionBlock product={product as ProductData} />
      </div>
    </>
  );
}

export default ProductDetails;
