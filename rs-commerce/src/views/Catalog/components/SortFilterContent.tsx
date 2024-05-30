import {
  CATALOG_PAGE_TEXT,
  PAGE_NUMBER_ONE,
  SORT_FILTER,
  SORT_FILTER_PROPS,
} from 'constants/constants';
import { SortFilterContentProps } from 'types/types';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import toggleBodyNotScrollable from 'utils/common-utils';
import style from '../style.module.css';

function SortFilterContent({ onClick }: SortFilterContentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { sortFilterValue } = useAppSelector(apiCategoriesProductsSelector);

  const setChecked = (value: string): boolean => value === sortFilterValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const curValue = e.target.value;
    dispatch(apiCategoriesProductsActions.setCurProductsPage(PAGE_NUMBER_ONE));
    dispatch(apiCategoriesProductsActions.setSortFilterValue(curValue));
    toggleBodyNotScrollable();
    dispatch(apiCategoriesProductsActions.setProductsFilter(null));
  };

  return (
    <div className={style['filter-content']}>
      <div className={style['filter-title']}>
        <div className={style['filter-name']}>{CATALOG_PAGE_TEXT.filterSort}</div>
        <div className={style['filter-close']} onClick={onClick} role="presentation" />
      </div>
      <div className={style['radio-filter']}>
        {SORT_FILTER_PROPS.map((el) => (
          <div className={style['radio-line']} key={el.id}>
            <input
              type="radio"
              id={el.value}
              name="sortFilter"
              value={el.value}
              className={style['radio-btn']}
              onChange={handleInputChange}
              checked={setChecked(el.value)}
            />
            <div className={style['radio-text']}>{SORT_FILTER[el.value]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortFilterContent;
