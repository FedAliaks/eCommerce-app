import ButtonPagination from 'components/button-pagination/button-pagination';
import { useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { PRODUCTS_IN_PAGE, ZERO } from 'constants/constants';
import style from './style.module.css';

function Pagination() {
  const { curProductsTotal, curProductsPage } = useAppSelector(apiCategoriesProductsSelector);
  const totalNumPages = curProductsTotal ? Math.ceil(curProductsTotal / PRODUCTS_IN_PAGE) : ZERO;

  return (
    <div className={style['pagination']}>
      <div>Page: </div>
      <ButtonPagination content="Prev" />
      <div className={style['pagination-pages-wrapper']}>
        <ButtonPagination content={`${curProductsPage}`} isActiveStyle />
        <div>of</div>
        <ButtonPagination content={`${totalNumPages}`} isActiveStyle />
      </div>
      <ButtonPagination content="Next" />
    </div>
  );
}

export default Pagination;
