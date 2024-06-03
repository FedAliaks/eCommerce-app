import { MainSortFilterContentProps } from 'types/types';
import { CATALOG_PAGE_TEXT, MAIN_FILTER_PROPS } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typed-react-redux-hooks';
import { apiCategoriesProductsSelector } from 'redux/selectors';
import { apiCategoriesProductsActions } from 'redux/slices/api-categories-products-slice';
import style from '../style.module.css';

function MainFilterContent({ onClick }: MainSortFilterContentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { priceFilter, simpleFilters } = useAppSelector(apiCategoriesProductsSelector);

  const setChecked = (v: string): boolean => !!(simpleFilters[v] ? simpleFilters[v] : false);

  const handleInputCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const curValue = e.target.value;
    // console.log(
    //   'curValue: ',
    //   curValue,
    //   '[curValue]: ',
    //   simpleFilters[curValue],
    //   '!simpleFilters[curValue]: ',
    //   !simpleFilters[curValue],
    // );
    dispatch(
      apiCategoriesProductsActions.setFilters({
        ...simpleFilters,
        [curValue]: e.target.checked,
      }),
    );
  };

  const handleInputPriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const curValue = e.target.id;
    if (curValue === 'min') {
      const v = +e.target.value ? +e.target.value : null;
      dispatch(
        apiCategoriesProductsActions.setPriceFilter({
          ...priceFilter,
          [curValue]: v,
        }),
      );
    } else if (curValue === 'max') {
      const v = +e.target.value ? +e.target.value : null;
      dispatch(
        apiCategoriesProductsActions.setPriceFilter({
          ...priceFilter,
          [curValue]: v,
        }),
      );
    }
  };

  return (
    <div className={style['filter-content']}>
      <div className={style['filter-title']}>
        <div className={style['filter-name']}>{CATALOG_PAGE_TEXT.filterMain}</div>
        <div className={style['filter-close']} onClick={onClick} role="presentation" />
      </div>
      <div className={style['price-filter']}>
        <div className={style['checkbox-filter-title']}>{MAIN_FILTER_PROPS.price.title}</div>
        <div className={style['price-line']}>
          <div>{MAIN_FILTER_PROPS.price.line.from}</div>
          <input
            type="number"
            className={style['input-price']}
            id="min"
            placeholder="min"
            value={`${priceFilter.min}`}
            onChange={handleInputPriceChange}
          />
          <div>{MAIN_FILTER_PROPS.price.line.to}</div>
          <input
            type="number"
            className={style['input-price']}
            id="max"
            placeholder="max"
            value={`${priceFilter.max}`}
            onChange={handleInputPriceChange}
          />
        </div>
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
            <label className={style['checkbox-text']} htmlFor={el.id}>
              {el.value}
            </label>
          </div>
        ))}
      </div>
      <div className={style['checkbox-filter']}>
        <div className={style['checkbox-filter-title']}>{MAIN_FILTER_PROPS.format.title}</div>
        {MAIN_FILTER_PROPS.format.values.map((el) => (
          <div className={style['checkbox-line']} key={el.id}>
            <input
              type="checkbox"
              id={el.id}
              name={MAIN_FILTER_PROPS.format.name}
              value={el.value}
              className={style['checkbox-btn']}
              onChange={handleInputCheckboxChange}
              checked={setChecked(el.value)}
            />
            <label className={style['checkbox-text']} htmlFor={el.id}>
              {el.value}
            </label>
          </div>
        ))}
      </div>
      <div className={style['checkbox-filter']}>
        <div className={style['checkbox-filter-title']}>{MAIN_FILTER_PROPS.rating.title}</div>
        <div className={style['checkbox-lines']}>
          {MAIN_FILTER_PROPS.rating.values.map((el) => (
            <div className={style['checkbox-line']} key={el.id}>
              <input
                type="checkbox"
                id={el.id}
                name={MAIN_FILTER_PROPS.rating.name}
                value={el.value}
                className={style['checkbox-btn']}
                onChange={handleInputCheckboxChange}
                checked={setChecked(el.value)}
              />
              <label className={style['checkbox-text']} htmlFor={el.id}>
                {el.value}
              </label>
            </div>
          ))}
        </div>
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
