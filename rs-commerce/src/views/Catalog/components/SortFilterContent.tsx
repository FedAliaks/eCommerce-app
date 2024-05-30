import { CATALOG_PAGE_TEXT, SORT_FILTER } from 'constants/constants';
import { SortFilterContentProps } from 'types/types';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import style from '../style.module.css';

function SortFilterContent({ onClick }: SortFilterContentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { sortFilterValue } = useAppSelector(apiCategoriesProductsSelector);

  const setChecked = (value: string): boolean => value === sortFilterValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const curValue = e.target.value;
    dispatch(apiCategoriesProductsActions.setSortFilterValue(curValue));
  };

  return (
    <div className={style['filter-content']}>
      <div className={style['filter-title']}>
        <div className={style['filter-name']}>{CATALOG_PAGE_TEXT.filterSort}</div>
        <div className={style['filter-close']} onClick={onClick} role="presentation" />
      </div>
      <div className={style['radio-filter']}>
        <div className={style['radio-line']}>
          <input
            type="radio"
            id="priceUp"
            name="sortFilter"
            value="priceUp"
            className={style['radio-btn']}
            onChange={handleInputChange}
            checked={setChecked('priceUp')}
          />
          <div className={style['radio-text']}>{SORT_FILTER['priceUp']}</div>
        </div>
        <div className={style['radio-line']}>
          <input
            type="radio"
            id="priceDown"
            name="sortFilter"
            value="priceDown"
            className={style['radio-btn']}
            onChange={handleInputChange}
            checked={setChecked('priceDown')}
          />
          <div className={style['radio-text']}>{SORT_FILTER['priceDown']}</div>
        </div>
        <div className={style['radio-line']}>
          <input
            type="radio"
            id="nameUp"
            name="sortFilter"
            value="nameUp"
            className={style['radio-btn']}
            onChange={handleInputChange}
            checked={setChecked('nameUp')}
          />
          <div className={style['radio-text']}>{SORT_FILTER['nameUp']}</div>
        </div>
        <div className={style['radio-line']}>
          <input
            type="radio"
            id="nameDown"
            name="sortFilter"
            value="nameDown"
            className={style['radio-btn']}
            onChange={handleInputChange}
            checked={setChecked('nameDown')}
          />
          <div className={style['radio-text']}>{SORT_FILTER['nameDown']}</div>
        </div>
      </div>
    </div>
  );
}

export default SortFilterContent;
