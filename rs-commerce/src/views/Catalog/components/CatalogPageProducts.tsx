import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { ProductProjection } from '@commercetools/platform-sdk';
import ProductItem from 'components/product-item/product-item';
import style from '../style.module.css';

function CatalogPageProducts(): JSX.Element {
  const { products } = useAppSelector(apiCategoriesProductsSelector);

  return (
    <div className={`container ${style['products']}`}>
      <div className={style['products-items']}>
        {products &&
          products.map((product: ProductProjection) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default CatalogPageProducts;
