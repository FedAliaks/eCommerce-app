import { CATALOG_PAGE_TEXT } from 'constants/constants';
import { useAppDispatch } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { FilterType } from 'types/types';
import toggleBodyNotScrollable from 'utils/common-utils';
import style from '../style.module.css';

function FilterMain(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleMainFilterClick = (): void => {
    toggleBodyNotScrollable();
    dispatch(apiCategoriesProductsActions.setProductsFilter(FilterType.mainFilter));
  };

  return (
    <button
      type="button"
      className={`${style['button-filter']} ${style['filter1']}`}
      onClick={handleMainFilterClick}>
      <div className={style['button-filter-image']} />
      <div className={style['button-filter-text']}>{CATALOG_PAGE_TEXT.filterMain}</div>
    </button>
  );
}

export default FilterMain;
