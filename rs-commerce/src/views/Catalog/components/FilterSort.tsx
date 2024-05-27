import { CATALOG_PAGE_TEXT } from 'constants/constants';
import { useAppDispatch } from 'hooks/typed-react-redux-hooks';
import { FilterType } from 'types/types';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import toggleBodyNotScrollable from 'utils/common-utils';
import style from '../style.module.css';

function FilterSort(): JSX.Element {
  const dispatch = useAppDispatch();
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
      <input type="text" className={style['filter-input-disabled']} disabled />
    </button>
  );
}

export default FilterSort;
