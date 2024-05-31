import { MainSortFilterContentProps } from 'types/types';
import { CATALOG_PAGE_TEXT, MAIN_FILTER_PROPS, MainFilterValues } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import style from '../style.module.css';

function MainFilterContent({ onClick }: MainSortFilterContentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { simpleFilters } = useAppSelector(apiCategoriesProductsSelector);

  const setChecked = (v: string): boolean => {
    let check = false;
    if (v === MainFilterValues.Paperback) check = simpleFilters.Paperback;
    else if (v === MainFilterValues.Hardcover) check = simpleFilters.Hardcover;

    return check;
  };

  const handleInputCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const curValue = e.target.value;
    if (curValue === MainFilterValues.Paperback)
      dispatch(
        apiCategoriesProductsActions.setFilters({
          ...simpleFilters,
          [curValue]: !simpleFilters[curValue],
        }),
      );
    else if (curValue === MainFilterValues.Hardcover)
      dispatch(
        apiCategoriesProductsActions.setFilters({
          ...simpleFilters,
          [curValue]: !simpleFilters[curValue],
        }),
      );
  };

  return (
    <div className={style['filter-content']}>
      <div className={style['filter-title']}>
        <div className={style['filter-name']}>{CATALOG_PAGE_TEXT.filterMain}</div>
        <div className={style['filter-close']} onClick={onClick} role="presentation" />
      </div>
      <div className={style['checkbox-filter']}>
        <div className={style['checkbox-filter-title']}>{MAIN_FILTER_PROPS.cover.title}</div>
        {MAIN_FILTER_PROPS.cover.values.map((el) => (
          <div className={style['checkbox-line']} key={el.id}>
            <input
              type="checkbox"
              id={el.id}
              name={MAIN_FILTER_PROPS.cover.name}
              value={el.value}
              className={style['checkbox-btn']}
              onChange={handleInputCheckboxChange}
              checked={setChecked(el.value)}
            />
            <div className={style['checkbox-text']}>{el.value}</div>
          </div>
        ))}
      </div>
      <div className={style['main-filter-btns']}>
        <button type="button" className={style['filter-btn']}>
          {MAIN_FILTER_PROPS.btnClearAll}
        </button>
        <button type="button" className={style['filter-btn']}>
          {MAIN_FILTER_PROPS.btnApply}
        </button>
      </div>
    </div>
  );
}

export default MainFilterContent;
