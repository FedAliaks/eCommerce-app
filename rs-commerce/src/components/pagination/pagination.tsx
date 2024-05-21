import ButtonPagination from 'components/button-pagination/button-pagination';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { NUMBER_ZERO, PAGE_NUMBER_ONE } from 'constants/constants';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import style from './style.module.css';

function Pagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const { productsTotal, curProductsPage, productsInPage } = useAppSelector(
    apiCategoriesProductsSelector,
  );
  const totalNumPages = productsTotal ? Math.ceil(productsTotal / productsInPage) : NUMBER_ZERO;
  const canSetPrevPage = (): boolean => curProductsPage > PAGE_NUMBER_ONE;
  const canSetNextPage = (): boolean => curProductsPage < totalNumPages;
  const prevBtnStyle = (): string => (canSetPrevPage() ? 'control-active' : 'control-notactive');
  const nextBtnStyle = (): string => (canSetNextPage() ? 'control-active' : 'control-notactive');

  const handlePrevBtnClick = (): void => {
    if (!canSetPrevPage()) return;

    dispatch(apiCategoriesProductsActions.setCurProductsPage(curProductsPage - 1));
  };

  const handleNextBtnClick = (): void => {
    if (!canSetNextPage()) return;

    dispatch(apiCategoriesProductsActions.setCurProductsPage(curProductsPage + 1));
  };

  return (
    <div className={style['pagination']}>
      <div>Page: </div>
      <ButtonPagination content="Prev" curStyle={prevBtnStyle()} onClick={handlePrevBtnClick} />
      <div className={style['pagination-pages-wrapper']}>
        <ButtonPagination content={`${curProductsPage}`} curStyle="standard" />
        <div>of</div>
        <ButtonPagination content={`${totalNumPages}`} curStyle="light" />
      </div>
      <ButtonPagination content="Next" curStyle={nextBtnStyle()} onClick={handleNextBtnClick} />
    </div>
  );
}

export default Pagination;
