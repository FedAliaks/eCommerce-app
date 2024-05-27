import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { FilterType, Nullable } from 'types/types';
import toggleBodyNotScrollable from 'utils/common-utils';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import MainFilterContent from './MainFilterContent';
import SortFilterContent from './SortFilterContent';
import style from '../style.module.css';

function FiltersPopup(): JSX.Element {
  const dispatch = useAppDispatch();
  const { productsFilter } = useAppSelector(apiCategoriesProductsSelector);

  let content: Nullable<JSX.Element> = null;
  if (productsFilter === FilterType.mainFilter) content = <MainFilterContent />;
  else if (productsFilter === FilterType.sortFilter) content = <SortFilterContent />;

  const closePopup = (): void => {
    toggleBodyNotScrollable();
    dispatch(apiCategoriesProductsActions.setProductsFilter(null));
  };

  return (
    <div className={style['filters-popup']} onClick={closePopup} role="presentation">
      {content && content}
    </div>
  );
}

export default FiltersPopup;
