import { CATALOG_PAGE_TEXT, SORT_FILTER } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { FilterType } from 'types/types';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import toggleBodyNotScrollable from 'utils/common-utils';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import style from '../style.module.css';

function FilterSort(): JSX.Element {
  const dispatch = useAppDispatch();
  const { sortFilterValue } = useAppSelector(apiCategoriesProductsSelector);

  const handleSortFilterClick = (): void => {
    toggleBodyNotScrollable();
    dispatch(apiCategoriesProductsActions.setProductsFilter(FilterType.sortFilter));
  };

  return (
    <button
      type="button"
      className={`${style['button-filter']} ${style['filter2']}`}
      onClick={handleSortFilterClick}>
      <div className={style['button-filter-text']}>{CATALOG_PAGE_TEXT.filterSort}</div>
      <div className={style['sort-filter-value']}>{SORT_FILTER[sortFilterValue]}</div>
    </button>
  );
}

export default FilterSort;
