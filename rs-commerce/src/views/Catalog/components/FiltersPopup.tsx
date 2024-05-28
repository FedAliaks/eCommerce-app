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

  const closePopup = (): void => {
    toggleBodyNotScrollable();
    dispatch(apiCategoriesProductsActions.setProductsFilter(null));
  };

  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const curEl = e.target as HTMLDivElement;
    if (curEl.classList.contains(`${style['filters-popup']}`)) {
      closePopup();
    }
  };

  let content: Nullable<JSX.Element> = null;
  if (productsFilter === FilterType.mainFilter) content = <MainFilterContent />;
  else if (productsFilter === FilterType.sortFilter)
    content = <SortFilterContent onClick={closePopup} />;

  return (
    <div className={style['filters-popup']} onClick={handlePopupClick} role="presentation">
      {content && content}
    </div>
  );
}

export default FiltersPopup;
