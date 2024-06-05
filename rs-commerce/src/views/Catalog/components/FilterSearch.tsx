import { CATALOG_PAGE_TEXT, PAGE_NUMBER_ONE } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import style from '../style.module.css';

function FilterSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const { searchInputValue } = useAppSelector(apiCategoriesProductsSelector);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(apiCategoriesProductsActions.setCurProductsPage(PAGE_NUMBER_ONE));
    dispatch(apiCategoriesProductsActions.setSearchInputValue(e.target.value));
  };

  return (
    <div className={`${style['button-filter']} ${style['filter3']}`}>
      <div className={style['button-filter-text']}>{CATALOG_PAGE_TEXT.filterSearch}</div>
      <input
        type="text"
        className={style['filter-input']}
        value={searchInputValue}
        onChange={handleInputValue}
      />
    </div>
  );
}

export default FilterSearch;
